import { createContext, ReactNode } from "react";

// Define the type for the context value
export const AuthContext = createContext<null | {}>(null);

// Define the AuthProvider component with children as props
interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
}
