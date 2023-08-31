import { createContext, useState, useEffect, ReactNode } from "react";
import { UserType, UserContextType } from './types';

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<UserType | null>(null)
  
  useEffect(() => {
    // Checks if user session exists 
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
  }, [])

  console.log(user);

  // Return the UserContext Provider with the user in value
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
};

export default UserContext