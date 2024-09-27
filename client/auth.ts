import NextAuth, {DefaultSession} from "next-auth";
import { getUserById } from "./data/users";
import authConfig from "./auth.config";
// import { UserRole } from "@prisma/client";
import axios from "axios";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },

  events: {
    async linkAccount({ user }){
    const newEmailVerified = new Date()
    await axios.put(`http://localhost:5000/users/update-verification/${user.id}`, newEmailVerified)
    }
  },

  callbacks: {
    async signIn({ user, account }){
      if(account?.provider !== "credentials") return true;
      
      if(!user?.emailverified) return false;

      return true;
    },
    async session({ token, session }){
      if(token.sub && session.user){
        session.user.id = token.sub;
      }

      return session;
    },
    async jwt({ token }){
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    }
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  ...authConfig,
});
