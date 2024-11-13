'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

interface ChosenItem {
  title: string;
  type: string;
  details: any;
}
// Define a type for your Auth context
interface AuthContextType {
  username: string;
  email: string;
  profilePicture: string;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  chosenItems: ChosenItem[];  // Add chosenItems to context
  setChosenItems: React.Dispatch<React.SetStateAction<ChosenItem[]>>;  // Provide method to update chosenItems
  queryParams: string;  // Add queryParams to context
  setQueryParams: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [chosenItems, setChosenItems] = useState<ChosenItem[]>([]);  // Local state for chosenItems
  const { data: session, status } = useSession();
  const [queryParams, setQueryParams] = useState<string>('');


  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session && session.user) {
        setUsername(session.user.name || "");
        setEmail(session.user.email || "");
        setProfilePicture(session.user.image || "");
        setIsLoggedIn(true);
        // Load the chosen items for the logged-in user from local storage (or API)
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
      setChosenItems([]);  // Clear chosen items on logout
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };

  useEffect(() => {
    // Save chosenItems in localStorage for the logged-in user
    if (isLoggedIn && email) {
      localStorage.setItem(email, JSON.stringify(chosenItems));
    }
  }, [chosenItems, isLoggedIn, email]);

  return (
    <AuthContext.Provider value={{ username, email, profilePicture, isLoggedIn, login, logout, chosenItems, setChosenItems, queryParams, setQueryParams }}>
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
