
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { LogOut, User } from 'lucide-react';

const NavBar = () => {
  const { currentUser, isAuthenticated, isHospital, isDonor, logout } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        
        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              {isDonor && (
                <>
                  <Link to="/donor" className="text-gray-600 hover:text-hopeBlue transition-colors">
                    Home
                  </Link>
                  <Link to="/about" className="text-gray-600 hover:text-hopeBlue transition-colors">
                    About Us
                  </Link>
                  <Link to="/contact" className="text-gray-600 hover:text-hopeBlue transition-colors">
                    Contact Us
                  </Link>
                  <Link to="/donate" className="text-gray-600 hover:text-hopeBlue transition-colors">
                    Donate
                  </Link>
                </>
              )}
              
              {isHospital && (
                <>
                  <Link to="/hospital" className="text-gray-600 hover:text-hopeBlue transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/hospital/tests" className="text-gray-600 hover:text-hopeBlue transition-colors">
                    Update Tests
                  </Link>
                  <Link to="/hospital/request" className="text-gray-600 hover:text-hopeBlue transition-colors">
                    Request Organ
                  </Link>
                  <Link to="/hospital/requests" className="text-gray-600 hover:text-hopeBlue transition-colors">
                    View Requests
                  </Link>
                </>
              )}
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>
                    {isHospital ? 
                      currentUser?.name || 'Hospital' : 
                      currentUser?.email || 'Donor'
                    }
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={logout}
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/" className="text-gray-600 hover:text-hopeBlue transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-hopeBlue transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-hopeBlue transition-colors">
                Contact Us
              </Link>
              <Link to="/login">
                <Button variant="outline" className="mr-2">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
