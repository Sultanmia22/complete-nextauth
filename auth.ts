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
          const res = await axios.post(
            `${process.env.BACKEND_URL}/api/v1/users/loginuser`,
            {
              email: credentials.email,
              password: credentials.password,
            },
          );

          if (res.status !== 200 || !res.data.success) {
            return null;
          }

          const {token,user} = res.data 
          
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            accessToken: token,
          };
          

        } catch (er: unknown) {
          console.error("Backend login call failed:", er);
          return null;
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
  },

  pages: {
    signIn: "/sign-in",
  },
});
