import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { UserType, UserContextType } from './types';
import { isDevelopmentMode, mockUser } from './development'

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    if (isDevelopmentMode) {
      // Set the mock user only in development mode
      setUser(mockUser);
    }else{
    // Checks if user session exists if not in dev mode
    fetch('/api/authorized')
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          setUser(null)
        }
      })
      .then((data: UserType) => {
        setUser(data) 
      })
      .catch(error => {
        console.error("Error fetching user:", error)
        setUser(null)
      })
    }
  }, [])


  // Function to handle logout
  const logout = () => {
    setUser(null); // Clear the user when logout is called
  };

  useEffect(() => {
    
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}