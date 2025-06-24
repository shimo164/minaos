import { logging } from "@/utils/logging";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { auth } from "./firebase";

/**
 * Registers a new user with email and password.
 * @param email User's email
 * @param password User's password
 */
export async function registerUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      logging("This email is already registered.");
      return null;
    }
    throw error;
  }
}

/**
 * Deletes the currently signed-in user.
 * @throws Error if deletion fails or no user is signed in.
 */
export async function deleteCurrentUser() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user is currently signed in.");
  }

  try {
    await deleteUser(user);
    logging("User deleted successfully.");
    return true;
  } catch (error: any) {
    throw new Error("Failed to delete the user.");
  }
}
