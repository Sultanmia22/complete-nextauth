import { ShieldCheck, KeyRound, Zap, CheckCircle2 } from "lucide-react";

export default function AuthRegisterBanner() {
  const features = [
    "Type-Safe Authentication for Next.js",
    "OAuth 2.0 & Passwordless Sign-In",
    "Encrypted JWT & Database Sessions",
    "Role-Based Access Control (RBAC)",
  ];

  return (
    <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-muted/40 p-10 text-foreground lg:flex ">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-primary/5 opacity-70" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

      {/* Top Branding */}
      <div className="relative z-10 flex items-center gap-2 text-lg font-bold">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <span>Auth.js Core</span>
      </div>

      {/* Middle Content */}
      <div className="relative z-10 my-auto space-y-6 max-w-lg">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Zap className="h-3.5 w-3.5" />
          Next-Gen Authentication
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Secure your App with Auth.js
        </h1>

        <p className="text-muted-foreground leading-relaxed">
          Flexible, open-source authentication designed for modern Next.js applications. Keep your user data safe with zero setup hassle.
        </p>

        {/* Feature List */}
        <div className="space-y-3 pt-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 text-sm font-medium">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Code Snippet Box */}
        <div className="mt-6 rounded-xl border border-border bg-background/60 p-4 backdrop-blur-sm shadow-sm font-mono text-xs space-y-1">
          <p className="text-muted-foreground">// lib/auth.ts</p>
          <p className="text-primary">import &#123; betterAuth &#125; from "better-auth";</p>
          <p className="text-foreground">export const auth = betterAuth(&#123; ... &#125;);</p>
        </div>
      </div>

      {/* Bottom Footer Quote */}
      <div className="relative z-10 border-t border-border/60 pt-4 text-xs text-muted-foreground flex items-center gap-2">
        <KeyRound className="h-4 w-4 text-primary" />
        <span>Enterprise-grade security built directly into your application.</span>
      </div>
    </div>
  );
}