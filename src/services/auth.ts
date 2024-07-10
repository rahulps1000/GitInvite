import { IUser } from "@/models/User";
import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import { addOrUpdateUser } from "./db/users";

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "repo read:user",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      const token = account?.access_token;
      if (!token) {
        return false;
      }
      const p = profile as GithubProfile;
      const user = {
        id: p.id,
        name: p.name ?? "",
        email: p.email ?? "",
        login: p.login,
        token: token,
      };
      await addOrUpdateUser(user as IUser);
      return true;
    },
    async session({ session, token }) {
      return { ...session, user: { ...session.user, id: token.sub } };
    },
  },
};

export default NextAuth(authOptions);
