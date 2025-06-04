
"use client";

import type { UserProfile } from '@/types';
import { useState, useEffect, useCallback } from 'react';

// Mock user data - replace with actual auth logic later
const MOCK_USER: UserProfile = {
  id: 'mock-user-123',
  email: 'user@example.com',
  name: 'Eco User',
  age: 30,
  address: {
    country: 'India',
    state: 'Maharashtra',
    city: 'Pune',
    manualAddress: '123 Eco Lane',
    pincode: '411007',
  },
  phoneNumber: '+919876543210',
  profileImageUrl: 'https://placehold.co/100x100.png?text=User',
  createdAt: new Date(),
};

interface AuthState {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (userData?: UserProfile) => void;
  logout: () => void;
}

// For this phase, we'll simulate login state with localStorage
// In a real app, this would interact with Firebase Auth
export function useAuth(): AuthState {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking auth status on mount
    try {
      const storedAuth = localStorage.getItem('ecoFindsAuth');
      if (storedAuth) {
        const authData = JSON.parse(storedAuth);
        if (authData.isLoggedIn && authData.user) {
          setUser(authData.user);
          setIsLoggedIn(true);
        }
      }
    } catch (error) {
      console.error("Error reading auth state from localStorage", error);
      // Clear potentially corrupted state
      localStorage.removeItem('ecoFindsAuth');
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((userData: UserProfile = MOCK_USER) => {
    setUser(userData);
    setIsLoggedIn(true);
    try {
      localStorage.setItem('ecoFindsAuth', JSON.stringify({ isLoggedIn: true, user: userData }));
    } catch (error) {
       console.error("Error saving auth state to localStorage", error);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    try {
      localStorage.removeItem('ecoFindsAuth');
    } catch (error) {
      console.error("Error removing auth state from localStorage", error);
    }
    // Potentially redirect to home or login page
    // router.push('/'); 
  }, []);

  return { user, isLoggedIn, isLoading, login, logout };
}
