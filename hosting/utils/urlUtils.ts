import { logging } from "@/utils/logging";

export const validateUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return !!parsedUrl.protocol && !!parsedUrl.hostname;
  } catch {
    return false;
  }
};

export const extractDomain = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  } catch {
    return null;
  }
};

export const isForbiddenDomain = (url: string): boolean => {
  const domain = extractDomain(url);
  if (!domain) return false;
  logging(`Checking if domain "${domain}" is forbidden?`);

  // Read forbidden domains directly from environment variable
  const forbiddenDomains =
    process.env.NEXT_PUBLIC_FORBIDDEN_DOMAINS?.split(",") || [];
  for (const forbiddenDomain of forbiddenDomains) {
    if (domain.includes(forbiddenDomain)) {
      logging(`Forbidden domain detected: ${extractDomain(url)}`);
      return true;
    }
  }
  return false;
};
