// next-auth.d.ts
import { Session as NextAuthSession } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends NextAuthSession {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: string;  // Added provider property
    };
  }

  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    id?: string;
    name?: string | null;
    email?: string | null;
    picture?: string | null;
    provider?: string;  // Added provider property
  }
}
