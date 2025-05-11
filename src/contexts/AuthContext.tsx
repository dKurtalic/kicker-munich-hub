
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  elo: number;
  isPremium: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkPremiumStatus: () => Promise<boolean>;
  subscribeUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // For demo purposes, check localStorage. In a real app, validate with your backend.
        const storedUser = localStorage.getItem('kicker_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Demo login function - in a real app this would connect to your backend
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user for demo
      const mockUser: User = {
        id: '1',
        name: 'Demo User',
        email,
        elo: 1500,
        isPremium: false,
      };
      
      setUser(mockUser);
      localStorage.setItem('kicker_user', JSON.stringify(mockUser));
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Demo signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user for demo
      const mockUser: User = {
        id: '1',
        name,
        email,
        elo: 1200, // Starting ELO
        isPremium: false,
      };
      
      setUser(mockUser);
      localStorage.setItem('kicker_user', JSON.stringify(mockUser));
      toast({
        title: "Account created!",
        description: "Welcome to KickerTUM.",
      });
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: "Could not create your account. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('kicker_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  const checkPremiumStatus = async () => {
    // In a real app, verify with backend/Stripe
    return user?.isPremium || false;
  };
  
  const subscribeUser = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock subscription success
      if (user) {
        const updatedUser = { ...user, isPremium: true };
        setUser(updatedUser);
        localStorage.setItem('kicker_user', JSON.stringify(updatedUser));
        
        toast({
          title: "Subscription successful!",
          description: "You now have access to all premium features.",
        });
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription failed",
        description: "Could not process your subscription. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    checkPremiumStatus,
    subscribeUser,
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
