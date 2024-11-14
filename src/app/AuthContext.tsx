"use client"; 
import { createContext, useContext, useState, useEffect } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useSearchParams } from "next/navigation"; // To access the URL query parameters

interface ChosenItem {
  title: string;
  type: string;
  details: any;
}

interface QueryParams {
  originRegion: string;
  destinationCity: string;
  startDate: string;
  endDate: string;
  guests: string;
  activities: string;
}

interface AuthContextType {
  username: string;
  email: string;
  profilePicture: string;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  chosenItems: ChosenItem[]; 
  setChosenItems: React.Dispatch<React.SetStateAction<ChosenItem[]>>; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [chosenItems, setChosenItems] = useState<ChosenItem[]>([]); 
  const { data: session, status } = useSession();
  

  const searchParams = useSearchParams(); // Get URL search params



  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session && session.user) {
        setUsername(session.user.name || "");
        setEmail(session.user.email || "");
        setProfilePicture(session.user.image || "");
        setIsLoggedIn(true);

        const savedItems = localStorage.getItem(session.user.email ?? "");
        if (savedItems) {
          setChosenItems(JSON.parse(savedItems)); // Load items from local storage if available
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, [session]);

  const login = async (email: string, password: string) => {
    try {
      const response = await signIn("credentials", { email, password, redirect: false });
      if (response?.ok) {
        const session = await getSession();
        setUsername(session?.user?.name || "");
        setIsLoggedIn(true);
      } else {
        throw new Error(response?.error || "Login failed");
      }
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      setUsername("");
      setIsLoggedIn(false);
      setChosenItems([]); 
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn && email) {
      localStorage.setItem(email, JSON.stringify(chosenItems));
    }
  }, [chosenItems, isLoggedIn, email]);

  return (
    <AuthContext.Provider value={{ username, email, profilePicture, isLoggedIn, login, logout, chosenItems, setChosenItems, }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
