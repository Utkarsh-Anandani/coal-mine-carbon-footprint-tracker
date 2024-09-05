import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { connectDB } from "./mongodb";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  //TODO: Uncomment these and see what happens
  // pages: {
  //   signIn: "/login",
  //   error: "/login",
  // },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "email / username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("trying to authorize user...");
        await connectDB();

        const userCredentials = credentials
          ? credentials
          : { username: "", password: "" };
        const username = userCredentials.username;
        const password = userCredentials.password;

        const dbUser = await User.findOne({
          email: username,
        });
        const dbPassword = dbUser?.password;

        const isValid = await bcrypt.compare(password, dbPassword as string);

        if (isValid) {
          const user = {
            id: dbUser?._id as string,
            name: dbUser?.name as string,
            email: dbUser?.email as string,
          };
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn(data: any) {
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await User.findOne({ email: user.email });
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
};
