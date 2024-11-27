import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: "2.0", // For Twitter OAuth 2.0
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    // Credentials Provider for email/password
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Please provide both email and password');
        }
      
        const { email, password } = credentials;
      
        try {
          const response = await axios.post(`${process.env.DOMAIN}/api/users/login`, { email, password });
      
          if (response.data && response.data.success) {
            console.log("response data: ", response.data);
            return {
              id: response.data.id,
              name: response.data.name,
              email: response.data.email,
              profilePicture: response.data.profilePicture,
            };
          } else {
            throw new Error(response.data.message || 'Invalid email or password');
          }
        } catch (error:any) {
          console.error("Authorization error:", error.message);
          throw new Error(error.response?.data?.message || 'Login failed');
        }
      }
      
      
    })
    
  ],
  session: {
    strategy: "jwt",
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.provider = account?.provider; // Store the provider information
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("session: ",session)
      session.user.id = token.id as string;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.provider = token.provider; // Include provider in session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
