import { logging } from "@/utils/logging";
import { getApps, initializeApp } from "firebase/app";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

// Load Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

logging("Firebase apps:", getApps());

export const auth = getAuth(app);

logging(
  "NEXT_PUBLIC_FIREBASE_WEB_APP_URL:",
  process.env.NEXT_PUBLIC_FIREBASE_WEB_APP_URL,
);

export const actionCodeSettings = {
  url: `${process.env.NEXT_PUBLIC_FIREBASE_WEB_APP_URL}/email-signin`,
  handleCodeInApp: true,
};

// Validate actionCodeSettings.url
if (!actionCodeSettings.url || !actionCodeSettings.url.startsWith("http")) {
  console.error("Invalid actionCodeSettings.url:", actionCodeSettings.url);
  throw new Error(
    "Invalid continue URL. Please check NEXT_PUBLIC_FIREBASE_WEB_APP_URL.",
  );
}

export const sendSignInLink = async (email: string) => {
  try {
    logging("Sign-in URL:", actionCodeSettings.url);
    logging("Sign-in link sent to:", email);
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    logging("Action code settings:", actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
    logging("Using actionCodeSettings.url =", actionCodeSettings.url);
    return "Sign-in link sent successfully!";
  } catch (error: any) {
    throw new Error(error.message);
  }
};
