import { Lock, ShieldCheck, KeyRound, Sparkles, CheckCircle2 } from "lucide-react";

export default function AuthLoginBanner() {
  const highlights = [
    "Seamless & Fast Authentication",
    "Multi-Factor Security Ready",
    "Session Persistence with JWT / Cookies",
  ];

  return (
    <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-muted/40 p-10 text-foreground lg:flex border-r border-border">
      {/* Glow Effects */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-primary/5 opacity-70" />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

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
          <Sparkles className="h-3.5 w-3.5" />
          Welcome Back
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Access Your Account Securely
        </h1>

        <p className="text-muted-foreground leading-relaxed">
          Log in to continue to your dashboard, manage your settings, and experience seamless application flow.
        </p>

        {/* Highlight List */}
        <div className="space-y-3 pt-2">
          {highlights.map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-sm font-medium">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Security Snippet Box */}
        <div className="mt-6 rounded-xl border border-border bg-background/60 p-4 backdrop-blur-sm shadow-sm flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">End-to-End Encrypted</p>
            <p className="text-xs text-muted-foreground">Your credentials are never stored in plain text.</p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="relative z-10 border-t border-border/60 pt-4 text-xs text-muted-foreground flex items-center gap-2">
        <KeyRound className="h-4 w-4 text-primary" />
        <span>Protected by industry standard encryption protocols.</span>
      </div>
    </div>
  );
}