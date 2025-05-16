// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
  userType: string | null;
  setUserType: (type: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userType, setUserType] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ userType, setUserType }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
