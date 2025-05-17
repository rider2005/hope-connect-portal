import { useState, useEffect } from 'react';

// Types for our database collections
export interface User {
  id: string;
  email: string;
  password: string;
  type: 'donor' | 'hospital';
  name?: string;
  hospitalName?: string; // Added to User interface to make it compatible with Hospital
}

export interface Hospital extends User {
  hospitalName: string;
  type: 'hospital';
}

export interface Donor extends User {
  type: 'donor';
  donorId?: string;
  donations?: Donation[];
  hopeTokens?: number;
  consentGiven?: boolean;
}

export interface Donation {
  id: string;
  donorId: string;
  organ: string;
  bloodGroup: string;
  hospitalId: string;
  status: 'pending_health_check' | 'test_completed' | 'organ_collected' | 'not_viable';
  appointmentDate: string;
  testCompleted?: boolean;
  donorHealth?: string;
  organHealth?: string;
  collectionDate?: string;
}

export interface Receiver {
  id: string;
  hospitalId: string;
  receiverId: string;
  neededOrgan: string;
  bloodGroup: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'transported' | 'transplanted';
}

// Mock database with explicit type casting
const mockDb = {
  users: [
    {
      id: 'h1',
      email: 'mercy@hospital.com',
      password: 'password123',
      type: 'hospital' as const,
      hospitalName: 'Mercy Hospital'
    },
    {
      id: 'h2',
      email: 'central@hospital.com',
      password: 'password123',
      type: 'hospital' as const,
      hospitalName: 'Central Hospital'
    },
    {
      id: 'h3',
      email: 'hope@hospital.com',
      password: 'password123',
      type: 'hospital' as const,
      hospitalName: 'Hope Medical Center'
    },
    {
      id: 'h4',
      email: 'city@hospital.com',
      password: 'password123',
      type: 'hospital' as const,
      hospitalName: 'City General Hospital'
    }
  ] as User[], // Cast to User[] type
  donors: [] as Donor[],
  donations: [] as Donation[],
  receivers: [] as Receiver[]
};

// LocalStorage keys
const STORAGE_KEYS = {
  USERS: 'hopeconnect_users',
  DONORS: 'hopeconnect_donors',
  DONATIONS: 'hopeconnect_donations',
  RECEIVERS: 'hopeconnect_receivers',
};

// Initialize database from localStorage or use mock data
const initializeDb = () => {
  try {
    // Try to load from localStorage
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const donors = JSON.parse(localStorage.getItem(STORAGE_KEYS.DONORS) || '[]');
    const donations = JSON.parse(localStorage.getItem(STORAGE_KEYS.DONATIONS) || '[]');
    const receivers = JSON.parse(localStorage.getItem(STORAGE_KEYS.RECEIVERS) || '[]');

    // If users collection is empty, initialize with mock data
    if (users.length === 0) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockDb.users));
      return mockDb;
    }

    return {
      users,
      donors,
      donations,
      receivers
    };
  } catch (error) {
    console.error('Error initializing database:', error);
    return mockDb;
  }
};

// Save data to localStorage
const saveToLocalStorage = (data: typeof mockDb) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(data.users));
    localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(data.donors));
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(data.donations));
    localStorage.setItem(STORAGE_KEYS.RECEIVERS, JSON.stringify(data.receivers));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Generate unique ID
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Use a React hook to provide database access
export function useDatabase() {
  const [db, setDb] = useState(initializeDb());

  // Save changes to localStorage whenever db changes
  useEffect(() => {
    saveToLocalStorage(db);
  }, [db]);

  // User operations
  const createUser = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: generateId() };
    setDb(prev => ({ 
      ...prev, 
      users: [...prev.users, newUser] 
    }));
    return newUser;
  };

  const findUserByEmail = (email: string): User | undefined => {
    return db.users.find(user => user.email === email);
  };

  // Donor operations
  const createDonor = (donor: Omit<Donor, 'id'>) => {
    const newDonor = { ...donor, id: generateId() };
    setDb(prev => ({
      ...prev,
      donors: [...prev.donors, newDonor]
    }));
    return newDonor;
  };

  const findDonorByUserId = (userId: string): Donor | undefined => {
    return db.donors.find(donor => donor.id === userId);
  };

  const updateDonor = (donorId: string, updates: Partial<Donor>) => {
    setDb(prev => ({
      ...prev,
      donors: prev.donors.map(donor => 
        donor.id === donorId ? { ...donor, ...updates } : donor
      )
    }));
  };

  // Donation operations
  const createDonation = (donation: Omit<Donation, 'id'>) => {
    const newDonation = { ...donation, id: generateId() };
    setDb(prev => ({
      ...prev,
      donations: [...prev.donations, newDonation]
    }));
    return newDonation;
  };

  const getDonationsByDonorId = (donorId: string) => {
    return db.donations.filter(donation => donation.donorId === donorId);
  };

  const getDonationsByHospitalId = (hospitalId: string) => {
    return db.donations.filter(donation => donation.hospitalId === hospitalId);
  };

  const updateDonation = (donationId: string, updates: Partial<Donation>) => {
    setDb(prev => ({
      ...prev,
      donations: prev.donations.map(donation => 
        donation.id === donationId ? { ...donation, ...updates } : donation
      )
    }));
  };

  // Receiver operations
  const createReceiver = (receiver: Omit<Receiver, 'id'>) => {
    const newReceiver = { ...receiver, id: generateId() };
    setDb(prev => ({
      ...prev,
      receivers: [...prev.receivers, newReceiver]
    }));
    return newReceiver;
  };

  const getReceiverByHospitalId = (hospitalId: string) => {
    return db.receivers.filter(receiver => receiver.hospitalId === hospitalId);
  };

  const updateReceiver = (receiverId: string, updates: Partial<Receiver>) => {
    setDb(prev => ({
      ...prev,
      receivers: prev.receivers.map(receiver => 
        receiver.id === receiverId ? { ...receiver, ...updates } : receiver
      )
    }));
  };

  // Get all hospitals
  const getAllHospitals = (): Hospital[] => {
    return db.users.filter(user => user.type === 'hospital') as Hospital[];
  };

  return {
    db,
    createUser,
    findUserByEmail,
    createDonor,
    findDonorByUserId,
    updateDonor,
    createDonation,
    getDonationsByDonorId,
    getDonationsByHospitalId,
    updateDonation,
    createReceiver,
    getReceiverByHospitalId,
    updateReceiver,
    getAllHospitals
  };
}

// Format date to YYYY-MM-DD
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Get date two days from now
export const getTwoDaysFromNow = (): string => {
  const date = new Date();
  date.setDate(date.getDate() + 2);
  return formatDate(date);
};
