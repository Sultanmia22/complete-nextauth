"use client"

import {
  KeyRound,
  Terminal,
  FileCode2,
  Route,
  ShieldCheck,
  LogIn,
  UserPlus,
  LogOut,
  UserCircle2,
  ExternalLink,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// ---------------------------------------------
// Small code-block component (no extra
// syntax-highlight library needed, plain & light)
// ---------------------------------------------
function CodeBlock({ filename, code }: { filename?: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-zinc-950">
      {filename && (
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-secondary/70" />
          <span className="ml-2 font-mono text-xs text-zinc-400">
            {filename}
          </span>
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono text-zinc-100">{code}</code>
      </pre>
    </div>
  )
}

// ---------------------------------------------
// Doc link — at the end of every step, a link
// to the original Auth.js documentation
// ---------------------------------------------
function DocLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
    >
      {label}
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  )
}

type Step = {
  number: string
  icon: React.ReactNode
  title: string
  description: string
  code: { filename?: string; code: string }[]
  docHref: string
  docLabel: string
}

const steps: Step[] = [
  {
    number: "01",
    icon: <Terminal className="h-5 w-5" />,
    title: "Install Auth.js",
    description:
      "Start by installing the next-auth (v5 / beta) package in your project. This single package handles signIn, signOut, and session — everything.",
    code: [
      {
        filename: "terminal",
        code: `npm install next-auth@beta`,
      },
    ],
    docHref: "https://authjs.dev/getting-started/installation",
    docLabel: "View installation docs",
  },
  {
    number: "02",
    icon: <KeyRound className="h-5 w-5" />,
    title: "Generate AUTH_SECRET",
    description:
      "The only required env variable in Auth.js is AUTH_SECRET — used to encrypt tokens/cookies. Running this command adds it to .env.local automatically.",
    code: [
      { filename: "terminal", code: `npx auth secret` },
      {
        filename: ".env.local",
        code: `AUTH_SECRET=random-generated-value`,
      },
    ],
    docHref: "https://authjs.dev/getting-started/installation",
    docLabel: "View environment setup docs",
  },
  {
    number: "03",
    icon: <FileCode2 className="h-5 w-5" />,
    title: "Create the auth.ts config file",
    description:
      "Create an auth.ts file at the project root. This is where providers, custom page paths — all your configuration lives.",
    code: [
      {
        filename: "auth.ts",
        code: `import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // TODO: look up and validate the user against your DB
        // returning null makes the login fail
        const user = {
          id: "1",
          name: "Emon",
          email: credentials.email,
        }
        return user
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
})`,
      },
    ],
    docHref: "https://authjs.dev/getting-started/installation",
    docLabel: "View config file docs",
  },
  {
    number: "04",
    icon: <Route className="h-5 w-5" />,
    title: "Add the Route Handler",
    description:
      "The App Router needs a catch-all route that exposes the handlers exported from auth.ts.",
    code: [
      {
        filename: "app/api/auth/[...nextauth]/route.ts",
        code: `import { handlers } from "@/auth"

export const { GET, POST } = handlers`,
      },
    ],
    docHref: "https://authjs.dev/getting-started/installation",
    docLabel: "View route handler docs",
  },
  {
    number: "05",
    icon: <LogIn className="h-5 w-5" />,
    title: "Sign In (built-in)",
    description:
      "Calling signIn() from a server action redirects to Auth.js's own built-in sign-in page. Handy for quick testing.",
    code: [
      {
        filename: "components/sign-in-button.tsx",
        code: `import { signIn } from "@/auth"

export function SignInButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      <button type="submit">Sign In</button>
    </form>
  )
}`,
      },
    ],
    docHref: "https://authjs.dev/getting-started/session-management/login",
    docLabel: "View sign in / out docs",
  },
  {
    number: "06",
    icon: <UserCircle2 className="h-5 w-5" />,
    title: "Custom Sign In Page",
    description:
      "To build a login page matching your own design, define pages.signIn in auth.ts, then build your own form at that route.",
    code: [
      {
        filename: "app/login/page.tsx",
        code: `import { signIn } from "@/auth"

export default function LoginPage() {
  return (
    <form
      action={async (formData) => {
        "use server"
        await signIn("credentials", formData)
      }}
    >
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  )
}`,
      },
    ],
    docHref: "https://authjs.dev/guides/pages/signin",
    docLabel: "View custom sign-in page docs",
  },
  {
    number: "07",
    icon: <UserPlus className="h-5 w-5" />,
    title: "Custom Sign Up",
    description:
      "Auth.js has no built-in sign-up — this part has to be built manually. Create a normal API route to create the user (hash the password and save to DB), then call signIn() with those credentials.",
    code: [
      {
        filename: "app/api/register/route.ts",
        code: `import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  // TODO: hash the password with bcrypt
  // TODO: save the user to your DB (Mongoose / Prisma)

  return NextResponse.json({ success: true })
}`,
      },
    ],
    docHref: "https://authjs.dev/getting-started/authentication/credentials",
    docLabel: "View credentials provider docs",
  },
  {
    number: "08",
    icon: <LogOut className="h-5 w-5" />,
    title: "Sign Out",
    description:
      "Use the signOut() server action to build a simple confirm-and-logout page.",
    code: [
      {
        filename: "app/logout/page.tsx",
        code: `import { signOut } from "@/auth"

export default function SignOutPage() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  )
}`,
      },
    ],
    docHref: "https://authjs.dev/guides/pages/signout",
    docLabel: "View sign out docs",
  },
  {
    number: "09",
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Protect Routes",
    description:
      "Use middleware.ts to protect the whole app or specific routes — if the user isn't logged in, they'll get redirected.",
    code: [
      {
        filename: "middleware.ts",
        code: `export { auth as middleware } from "@/auth"

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
}`,
      },
    ],
    docHref: "https://authjs.dev/getting-started/session-management/protecting",
    docLabel: "View protecting routes docs",
  },
]

export default function AuthDocument() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      {/* Header */}
      <div className="mb-10 space-y-3">
        <Badge className="bg-primary text-primary-foreground">
          Next.js + Auth.js
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Auth.js Setup Guide
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          From install to custom Sign In / Sign Up — step by step. Written
          to be easy for beginners, with a link to the official
          documentation at the end of every step for more detail.
        </p>
      </div>

      <Separator className="mb-10" />

      {/* Steps */}
      <div className="space-y-8">
        {steps.map((step) => (
          <Card key={step.number} className="border-border">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {step.icon}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {step.number}
                    </span>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </div>
                  <CardDescription>{step.description}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 pl-[4.25rem]">
              {step.code.map((block, i) => (
                <CodeBlock key={i} filename={block.filename} code={block.code} />
              ))}
              <div className="pt-1">
                <DocLink href={step.docHref} label={step.docLabel} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-10 rounded-xl border border-border bg-muted/40 p-5">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Note: </span>
          This guide is meant as a basic overview — for production you'll
          need to add your own password hashing, DB validation, error
          handling, and rate limiting. For full details, follow the link
          under each section to read the original docs.
        </p>
        <div className="mt-3">
          <a
            href="https://authjs.dev/getting-started"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            Full Auth.js documentation
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}