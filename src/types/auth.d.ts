import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  export interface User extends DefaultUser {
    id: string;
  }
  export interface Session extends DefaultSession {
    user: User;
  }
}
