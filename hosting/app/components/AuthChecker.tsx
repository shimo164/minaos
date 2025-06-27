import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

const AuthChecker = ({
  onAuthChange,
}: {
  onAuthChange: (loggedIn: boolean) => void;
}) => {
  useEffect(() => {
    // Set initial login state synchronously
    onAuthChange(!!auth.currentUser);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      onAuthChange(!!user);
    });
    return () => unsubscribe();
  }, [onAuthChange]);

  return null;
};

export default AuthChecker;
