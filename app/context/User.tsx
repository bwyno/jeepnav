import React, { createContext, useState } from 'react';

export const UserContext = createContext<any>(null);

export function UserContextProvider({ children }: any) {
  const [user, setUser] = useState();
  const [userRole, setUserRole] = useState();
  const [userLocation, setUserLocation] = useState();
  const [otherUsers, setOtherUsers] = useState();

  return (
    <UserContext.Provider
      value={{
        userRole,
        setUserRole,
        userLocation,
        setUserLocation,
        user,
        setUser,
        otherUsers,
        setOtherUsers,
      }}>
      {children}
    </UserContext.Provider>
  );
}
