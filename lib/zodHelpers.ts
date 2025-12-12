import { z, ZodError } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Please enter your password"),
});

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
