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
import { h1, h1Text, normalText_c } from "@/styles/classNames/typography";
import { handleResponse } from "@/utils/handle_response";
import { logging } from "@/utils/logging";
import { isForbiddenDomain, validateUrl } from "@/utils/urlUtils";
import clsx from "clsx";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/auth-context";

export default function DashboardPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [url, setUrl] = useState("");
  const defaultModel = "gemini-2.0-flash";
  const [model, setModel] = useState(defaultModel);
  const [appResult, setResult] = useState<any>(null);
  const [elapsedTime, setElapsedTime] = useState<string | null>(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const { user, loading } = useAuth();
  useEffect(() => {
    const isAdminMode = sessionStorage.getItem("adminMode") === "true";

    if (loading) return; // Prevent navigation during loading
    if (!user && !isAdminMode) {
      router.push("/");
    }
  }, [loading, user, router]);

  const handleSubmit = async () => {
    logging("Target url:", url, "model:", model);
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

      try {
        const response = await fetch(firebaseFunctionUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ url, model }),
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
      } catch (err) {
        setFetchError((err as Error).message);
      }
    } catch (e: any) {
      setFetchError(`An error occurred: ${e.message}`);
    } finally {
      setFetchLoading(false);
    }
  };

  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <p>{error}</p>;

  return (
    <PageLayout>
      <div className={columnLayoutStyles}>
        <MenuBar />
        <div>
          <h1 className={clsx(h1, h1Text)}>ダッシュボード</h1>

          <p className={normalText_c}>
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
