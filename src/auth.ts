import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: { level: "email", type: "email" },
        password: { level: "password", type: "password" },
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.accessToken = token.accessToken as string;
      return session;
    },
    async authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isLoggedIn = !!auth?.user;

      if (pathname.startsWith("/private")) {
        return isLoggedIn;
      }
      return true;
    },
  },

  pages: {
    signIn: "/signin",
  },
});
