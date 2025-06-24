"use client";

import MenuBar from "@/app/components/MenuBar";
import { buttonClass } from "@/styles/classNames/button";
import { errorClass } from "@/styles/classNames/dashboard";
import { background, container } from "@/styles/classNames/layout";
import { linkText } from "@/styles/classNames/typography";
import { getApps, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Ensure Firebase is only initialized once
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    setIsAdminMode(!!user);
  }, []);

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAdminMode(true);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAdminMode(false);
      router.push("/");
    } catch (err) {
      setError("Failed to log out.");
    }
  };

  return (
    <>
      <div className={background}>
        <MenuBar />
        <div className={container}>
          <div className="mb-4 text-center">
            <h1 className="text-l mt-4">Admin Login</h1>
            {!isAdminMode && (
              <div className="mt-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="mb-2 w-full max-w-xs rounded border p-2"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full max-w-xs rounded border p-2"
                />
                <button onClick={handleSubmit} className={buttonClass("blue")}>
                  Login
                </button>
                {error && <div className={errorClass}>{error}</div>}
              </div>
            )}
            {isAdminMode && (
              <div>
                <button className={buttonClass("red")} onClick={handleLogout}>
                  Logout
                </button>
                <div className="mt-4">
                  <a href="/dashboard" className={linkText}>
                    Go to Dashboard
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
