import { ZodError } from "zod";

export function formatZodError(error: ZodError): Record<string, string> {
  const formatted: Record<string, string> = {};

  error.issues.forEach((issue) => {
    const field = issue.path[0].toString();
    if (field && !formatted[field]) {
      formatted[field] = issue.message;
    }
  });

  return formatted;
}
