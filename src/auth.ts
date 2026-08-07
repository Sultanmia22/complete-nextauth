import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google"

const protectedRoutes: { path: string; roles?: string[] }[] = [
  {path: "/private"},
  {path: "/dashboard",},
]

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    Credentials({
      name: "Credentials",

      credentials: {
        email: { lavel: "email", type: "email" },
        password: { lavel: "password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          console.log("Attempting login with:", {
            email: credentials.email,
            backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
          });

          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/loginuser`,
            {
              email: credentials.email,
              password: credentials.password,
            },
          );

          if (res.status !== 200 || !res.data.success) {
            return null;
          }

          const { token, user } = res.data.data;

          return {
            id: user._id.toString(),
            name: user.name || "User",
            email: user.email,
            role: user.role || "user",
            accessToken: token,
          };
        } catch (er: unknown) {
          console.error("Login error details:", er);

          if (axios.isAxiosError(er)) {
            const serverErrorMessage =
              er.response?.data?.message ||
              er.response?.data?.error ||
              er.message ||
              "Login Failed";
            console.error("Axios error:", {
              status: er.response?.status,
              data: er.response?.data,
              message: er.message,
            });
            throw new Error(serverErrorMessage);
          }

          console.error("Non-axios error:", er);
          throw new Error("Login Failed");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/sociallogin`, {
            name: user.name,
            email: user.email,
            provider: account.provider,
            googleId: account.providerAccountId,
          });

          if(res.status !== 201 || !res.data.success) {
            console.error("Google sign-in backend sync failed:", res.data);
            return false;
          }

          const {token, user: backendUser} = res.data.data;
          user.id = backendUser._id.toString();
          user.role = backendUser.role || "user";
          user.accessToken = token;

          return true;
        } catch (error: unknown ) {
          console.error("Google sign-in backend sync failed:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.accessToken = user.accessToken;
        token.role = user.role as string;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.accessToken = token.accessToken as string;
      session.user.role = token.role as string;
      return session;
    },

    async authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user?.role;

      const matchedRoute = protectedRoutes.find((route) => {
        return pathname === route.path || pathname.startsWith(`${route.path}/`);
      });

      if (!matchedRoute) {
        return true;
      }

      if (!isLoggedIn) {
        return false;
      }

      if (
        matchedRoute.roles &&
        !matchedRoute.roles.includes(userRole as string)
      ) {
        return false;
      }

      return true;
    },
  },

  pages: {
    signIn: "/signin",
  },
});
