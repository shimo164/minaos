"use client";

import {
  ErrorDisplay,
  GeminiModelSelector,
  MenuBar,
  PageLayout,
  SubmitButton,
  UrlInputField,
} from "@/app/components";

import { columnLayoutStyles, squareArea } from "@/styles/classNames";

import ResultDisplay from "@/app/components/ResultDisplay";
import { auth } from "@/lib/firebase";
import { handleResponse } from "@/utils/handle_response";
import { logging } from "@/utils/logging";
import { isForbiddenDomain, validateUrl } from "@/utils/urlUtils";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [url, setUrl] = useState("");
  const defaultModel = "gemini-2.0-flash";
  const [model, setModel] = useState(defaultModel);
  const [appResult, setResult] = useState<any>(null);
  const [elapsedTime, setElapsedTime] = useState<string | null>(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

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
  }, []);

  const handleSubmit = async () => {
    logging("Target url:", url, "model", model);
    if (!validateUrl(url)) {
      logging(`Invalid URL format: ${url}`);
      setFetchError("Invalid URL format.");
      return;
    }

    if (isForbiddenDomain(url)) {
      setFetchError("This domain is forbidden.");
      return;
    }

    setFetchLoading(true);
    // setResult(`URL entered: ${url}`); // TODO: consider removing this
    setFetchError(null);

    try {
      const firebaseFunctionUrl =
        process.env.NEXT_PUBLIC_FIREBASE_CLOUD_RUN_FUNCTION_URL;
      logging(`Firebase Function: ${firebaseFunctionUrl}`);

      const auth = getAuth();
      if (!auth.currentUser) {
        logging("No user is signed in.");
        setFetchError("User is not authenticated.");
        return;
      }
      const idToken = await auth.currentUser.getIdToken();

      logging("body", JSON.stringify({ url: url, model: model }));

      const response = await fetch(firebaseFunctionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ url: url, model: model }),
      });

      const { output, elapsed_time, error } = await handleResponse(
        response,
        url,
      );
      if (error) {
        setFetchError(error);
        return;
      }
      setElapsedTime(elapsed_time);
      setResult(output);
    } catch (e: any) {
      setFetchError(`An error occurred: ${e.message}`);
    } finally {
      setFetchLoading(false);
    }
  };

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <PageLayout>
      <div className={columnLayoutStyles}>
        <MenuBar />
        <div>
          <h1 className="py-6 text-center text-2xl font-bold text-gray-800">
            ダッシュボード
          </h1>
          <p className="mb-6 text-center text-gray-600">
            URLを入力して実行してください。
            <br />
          </p>
        </div>
        <div className={squareArea}>
          test用
          <br />
          https://zenn.dev/shimo_s3/articles/28d9e446065c6e
        </div>
        <UrlInputField url={url} setUrl={setUrl} />
        <GeminiModelSelector model={model} setModel={setModel} />
        <SubmitButton handleSubmit={handleSubmit} fetchLoading={fetchLoading} />
        <ErrorDisplay error={fetchError} />
        <ResultDisplay appResult={appResult} elapsedTime={elapsedTime} />
      </div>
    </PageLayout>
  );
}
