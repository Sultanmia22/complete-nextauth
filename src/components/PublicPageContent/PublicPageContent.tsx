import Link from "next/link";

export default function PublicPageContent() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">
            Auth.js (NextAuth) Demo
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
            Welcome to Our Public Home Page
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            This is an open landing page accessible to anyone without authentication. Click Sign In to test and explore your Auth.js setup.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/login"
              className="w-full sm:w-auto px-6 py-3 text-base font-medium text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 shadow-md transition"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-6 py-3 text-base font-medium text-secondary-foreground bg-secondary border border-border rounded-xl hover:bg-secondary/80 shadow-xs transition"
            >
              Go to Dashboard (Protected)
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16 text-left">
          <div className="p-6 bg-card text-card-foreground rounded-2xl border border-border shadow-xs">
            <div className="w-10 h-10 mb-4 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-1">Public Access</h3>
            <p className="text-sm text-muted-foreground">
              Accessible to any visitor without any authentication restrictions.
            </p>
          </div>

          <div className="p-6 bg-card text-card-foreground rounded-2xl border border-border shadow-xs">
            <div className="w-10 h-10 mb-4 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-1">Auth.js Ready</h3>
            <p className="text-sm text-muted-foreground">
              Ready for integration with Credentials, Google, GitHub, or other providers.
            </p>
          </div>

          <div className="p-6 bg-card text-card-foreground rounded-2xl border border-border shadow-xs">
            <div className="w-10 h-10 mb-4 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-1">Protected Routes</h3>
            <p className="text-sm text-muted-foreground">
              Ideal for practicing route protection using Next.js Middleware.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} AuthApp. All rights reserved.</p>
      </footer>

    </div>
  );
}