import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";

export function useAuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkAuth = () => {
      const currentUser = auth.currentUser;
      setIsLoggedIn(!!currentUser);
    };
    checkAuth();
    // Optionally, you can add an auth state listener here if needed
  }, []);
}
