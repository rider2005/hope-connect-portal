
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Hospital, Donor, useDatabase } from './db';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (email: string, password: string) => boolean;
  isAuthenticated: boolean;
  isHospital: boolean;
  isDonor: boolean;
  hospital: Hospital | null;
  donor: Donor | null;
  updateDonorConsent: (consent: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [donor, setDonor] = useState<Donor | null>(null);
  const { toast } = useToast();
  
  const { 
    findUserByEmail, 
    createUser, 
    createDonor, 
    findDonorByUserId,
    updateDonor 
  } = useDatabase();

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        setCurrentUser(user);
        
        // Set hospital or donor
        if (user.type === 'hospital') {
          setHospital(user as Hospital);
        } else if (user.type === 'donor') {
          const donorDetails = findDonorByUserId(user.id);
          if (donorDetails) {
            setDonor(donorDetails);
          }
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, [findDonorByUserId]);

  const login = (email: string, password: string): boolean => {
    const user = findUserByEmail(email);
    
    if (user && user.password === password) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Set hospital or donor
      if (user.type === 'hospital') {
        setHospital(user as Hospital);
        setDonor(null);
      } else if (user.type === 'donor') {
        const donorDetails = findDonorByUserId(user.id);
        if (donorDetails) {
          setDonor(donorDetails);
        }
        setHospital(null);
      }
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.type === 'hospital' ? (user as Hospital).hospitalName : email}!`,
      });
      
      return true;
    }
    
    toast({
      variant: "destructive",
      title: "Login Failed",
      description: "Invalid email or password. Please try again.",
    });
    
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setHospital(null);
    setDonor(null);
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const register = (email: string, password: string): boolean => {
    // Check if email already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: "Email already in use. Please use a different email or login.",
      });
      return false;
    }

    // Create new user with donor role
    const newUser = createUser({
      email,
      password,
      type: 'donor'
    });

    // Create donor record with the same user data
    createDonor({
      email,
      password,
      type: 'donor',
      hopeTokens: 0,
      consentGiven: false
    });

    toast({
      title: "Registration Successful",
      description: "Your account has been created. You can now log in.",
    });

    return true;
  };

  const updateDonorConsent = (consent: boolean) => {
    if (currentUser && donor) {
      updateDonor(currentUser.id, { consentGiven: consent });
      setDonor({...donor, consentGiven: consent});
      
      toast({
        title: consent ? "Consent Given" : "Consent Revoked",
        description: consent 
          ? "Thank you for giving consent for the Hope Tokens program." 
          : "You have revoked your consent for the Hope Tokens program.",
      });
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    register,
    isAuthenticated: !!currentUser,
    isHospital: !!currentUser && currentUser.type === 'hospital',
    isDonor: !!currentUser && currentUser.type === 'donor',
    hospital,
    donor,
    updateDonorConsent
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
