"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

interface ChosenItem {
  title: string;
  type: string;
  details: Record<string, unknown>; // Replace `any` with a more specific type
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

  const { data: session } = useSession(); // `status` removed since it's unused

  useEffect(() => {
    const checkSession = async () => {
      const currentSession = await getSession();
      if (currentSession && currentSession.user) {
        setUsername(currentSession.user.name || "");
        setEmail(currentSession.user.email || "");
        setProfilePicture(currentSession.user.image || "");
        setIsLoggedIn(true);

        const savedItems = localStorage.getItem(currentSession.user.email ?? "");
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
      console.log("Response: ",response)
      if (response?.ok) {
        const currentSession = await getSession();
        setUsername(currentSession?.user?.name || "");
        setEmail(currentSession?.user?.email || "");
        setProfilePicture(currentSession?.user?.image || "");
        setIsLoggedIn(true);
      } else {
        throw new Error(response?.error || "Login failed");
      }
<<<<<<< Updated upstream
    } catch (error:any) {
      console.error("Login Failed:", error.message);
      throw new Error(`Login Failed: ${error.message}`);
=======
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Login Failed:", error.message);
        throw new Error(`Login Failed: ${error.message}`);
      }
      throw new Error("An unexpected error occurred during login.");
>>>>>>> Stashed changes
    }
  };

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      setUsername("");
      setEmail("");
      setProfilePicture("");
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
    <AuthContext.Provider value={{ username, email, profilePicture, isLoggedIn, login, logout, chosenItems, setChosenItems }}>
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
