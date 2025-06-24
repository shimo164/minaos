import { auth } from "@/lib/firebase";
import { useEffect } from "react";

interface AuthCheckerProps {
  onAuthChange: (isLoggedIn: boolean) => void;
}

export default function AuthChecker({ onAuthChange }: AuthCheckerProps) {
  useEffect(() => {
    const checkAuth = () => {
      const currentUser = auth.currentUser;
      onAuthChange(!!currentUser);
    };
    checkAuth();
    // Optionally, you can add an auth state listener here if needed
  }, [onAuthChange]);

  return null; // This component does not render anything
}
