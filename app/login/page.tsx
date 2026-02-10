"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { loginSchema, formatZodError } from "@/lib/zodHelpers";
import { ZodError } from "zod";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    loginSchema.parse({ email, password });
  } catch (err) {
    if (err instanceof ZodError) {
      const formatted = formatZodError(err);
      setError(formatted.email || formatted.password || "Invalid input");
    }
    setLoading(false);
    return;
  }

  try {
    const { data, error: authError } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/", 
    }, {
      onRequest: () => setLoading(true),
      onSuccess: () => {
        router.push("/");
      },
      onError: (ctx) => {
        setError(ctx.error?.message || "Login failed");
        setLoading(false);
      },
    });

    if (authError) {
      setError(authError.message?.toString() || "Login failed");
      setLoading(false);
    }
  } catch (err) {
    setError("Unexpected error during login");
    setLoading(false);
  }
};

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-secondary/30">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Login to share food with your community
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:underline font-medium"
              >
                Register here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
