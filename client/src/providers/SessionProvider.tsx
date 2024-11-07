'use client'

// import { Role } from "@prisma/client";
import { Session, User } from "lucia";
import { createContext, useContext } from "react";

interface SessionProviderProps {
  user: User | null;
  session: Session | null;
  email?: string | null;
  birth_date?: string | null;
  gender?: string | null;
  marital_status?: string | null;
  address?: string | null;
  postcode?: string | null;
  state?: string | null;
  lga?: string | null;
  nationality?: string | null;
  occupation?: string | null;
  isOnboarded?: boolean | null;
  know_your_member?: boolean | null;
//   role?: Role | null;
  reg_paid?: boolean | null;

  // Add the missing fields
  id?: boolean | null;
  first_name?: string | null;
  last_name?: string | null;
  middle_name?: string | null;
  hashed_password?: string | null;
  phone_number?: string | null;
  membership_status?: string | null;
  dues_paid?: boolean | null;
  isSubscribed?: boolean | null;
  updatedBy?: string | null;
  picture?: string | null;

  nok_first_name?: string | null;
  nok_last_name?: string | null;
  nok_email?: string | null;
  nok_phone?: string | null;
  nok_gender?: string | null;
  nok_nationality?: string | null;
  nok_address?: string | null;
  nok_postcode?: string | null;

  email_verified?: boolean | null;

  membership?: string | null;
  subscription?: string | null;
  orders?: string[] | null;
  comments?: string[] | null;
  likes?: string[] | null;
}


const SessionContext = createContext<SessionProviderProps>(
  {} as SessionProviderProps
)

export const SessionProvider = ({
  children, value
}: {
  children:React.ReactNode 
  value: SessionProviderProps
}) => {
  return(<SessionContext.Provider value={value}>{children}</SessionContext.Provider>)
}

export const useSession = () => {
  const sessionContext = useContext(SessionContext)

  if(!sessionContext){
    throw new Error("useSession must be used within a SessionProvider")
  }
  return sessionContext;
}

