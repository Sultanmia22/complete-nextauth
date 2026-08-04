import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken: string;
    role: string;
  }

  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken: string;
    role: string;
  }
}