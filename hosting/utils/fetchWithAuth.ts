import { logging } from "@/utils/logging";
import { getAuth } from "firebase/auth";

export const fetchWithAuth = async (
  url: string,
  model: string,
  firebaseFunctionUrl: string,
): Promise<Response> => {
  const auth = getAuth();
  if (!auth.currentUser) {
    logging("No user is signed in.");
    throw new Error("User is not authenticated.");
  }
  console.log("uuid:", auth.currentUser?.uid); // TODO: consider removing this log
  logging("User is authenticated:", auth.currentUser.email);

  const idToken = await auth.currentUser.getIdToken();
  logging("ID Token:", idToken);

  const body = JSON.stringify({ url, model });
  logging("Request body:", body);

  const response = await fetch(firebaseFunctionUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body,
  });

  return response;
};
