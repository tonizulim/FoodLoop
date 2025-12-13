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
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { registerSchema, formatZodError } from "@/lib/zodHelpers";
import { ZodError } from "zod";
import { FormStatus } from "@/types/States";


export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [status, setStatus] = useState<FormStatus>({
    loading: false,
    success: false,
    error: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus({ loading: true, success: false, error: "" });

    try {
      registerSchema.parse({
        email,
        password,
        confirmPassword,
      });
    } catch (err) {
      if (err instanceof ZodError) {
        const formatted = formatZodError(err);
        setStatus({
          loading: false,
          success: false,
          error:
            formatted.email ||
            formatted.password ||
            formatted.confirmPassword ||
            "Invalid input",
        });
        return;
      }
    }

    setStatus({
      loading: false,
      success: true,
      error: "",
    });

    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-secondary/30">
      {" "}
      <Card className="w-full max-w-md">
        {" "}
        <CardHeader className="space-y-1">
          {" "}
          <CardTitle className="text-2xl font-bold text-center">
            {" "}
            Create an account{" "}
          </CardTitle>{" "}
          <CardDescription className="text-center">
            {" "}
            Join our community and start sharing food{" "}
          </CardDescription>{" "}
        </CardHeader>{" "}
        <form onSubmit={handleSubmit}>
          {" "}
          <CardContent className="space-y-4">
            {" "}
            {status.error && (
              <Alert variant="destructive">
                {" "}
                <AlertCircle className="h-4 w-4" />{" "}
                <AlertDescription>{status.error}</AlertDescription>{" "}
              </Alert>
            )}{" "}
            {status.success && (
              <Alert className="border-primary bg-primary/10">
                {" "}
                <CheckCircle2 className="h-4 w-4 text-primary" />{" "}
                <AlertDescription className="text-primary">
                  {" "}
                  Registration successful! Your account is pending admin
                  approval. You'll be able to post food listings once approved.{" "}
                </AlertDescription>{" "}
              </Alert>
            )}{" "}
            <div className="space-y-2">
              {" "}
              <Label htmlFor="email">Email</Label>{" "}
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />{" "}
            </div>{" "}
            <div className="space-y-2">
              {" "}
              <Label htmlFor="password">Password</Label>{" "}
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
            </div>{" "}
            <div className="space-y-2">
              {" "}
              <Label htmlFor="confirmPassword">Confirm Password</Label>{" "}
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />{" "}
            </div>{" "}
          </CardContent>{" "}
          <CardFooter className="flex flex-col gap-4">
            {" "}
            <Button
              type="submit"
              className="w-full mt-4"
              disabled={status.loading || status.success}
            >
              {" "}
              {status.loading ? "Creating account..." : "Register"}{" "}
            </Button>{" "}
            <p className="text-sm text-center text-muted-foreground">
              {" "}
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                {" "}
                Login here{" "}
              </Link>{" "}
            </p>{" "}
          </CardFooter>{" "}
        </form>{" "}
      </Card>{" "}
    </div>
  );
}
