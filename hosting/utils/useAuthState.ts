import { auth } from "@/lib/firebase";
import { logging } from "@/utils/logging";
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuthState = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const isAdminMode = sessionStorage.getItem("adminMode") === "true";

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          console.log("uuid:", user?.uid); // TODO: consider removing this log
        } else if (isAdminMode) {
          logging("enabled: Admin mode");
        } else {
          console.error("error: No user is signed in."); // TODO: should bd checked
        }
        if (!user && !isAdminMode) {
          router.push("/");
        } else {
          setLoading(false);
        }
      },
      (error) => {
        setError("Failed to authenticate.");
      },
    );

    return () => unsubscribe();
  }, [router]);

  return { loading, error };
};
