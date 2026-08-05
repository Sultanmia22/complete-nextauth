"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

// 1. Zod Validation Schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // 2. React Hook Form Setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. Submit Handler
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: data?.email,
        password: data?.password,
        redirect: false,
      })

      if (result?.error) {
        console.log("Error from authorize:", result.error);

        toast.error("Login Failed", {
          description: result.error,
        });
      } else {
        toast.success("Login Successful!", {
          description: "Redirecting to your private page...",
        });
      }

      router.push("/private");

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Invalid email or password!";

        toast.error("Login Failed", {
          description: errorMessage,
        });
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      console.error("Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-6">
        {/* Form Header */}
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register("email")}
              className={`w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring ${
                errors.email ? "border-destructive" : "border-input"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input with Show/Hide Toggle */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium leading-none" htmlFor="password">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className={`w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors pr-10 focus:ring-2 focus:ring-ring ${
                  errors.password ? "border-destructive" : "border-input"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isLoading} className="w-full mt-2 font-medium">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* Footer Redirect to Register */}
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}