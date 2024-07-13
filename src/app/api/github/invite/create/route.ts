import { IRepo } from "@/models/Repo";
import { IToken } from "@/models/Token";
import { authOptions } from "@/services/auth";
import { getUser } from "@/services/db/users";
import { getRepo } from "@/services/github";
import jwt from "jsonwebtoken";
import {
  encodeToUrlSafeBase64,
  generateToken,
  generateUniqueHash,
} from "@/services/jwt";
import { getServerSession } from "next-auth";
import { IInvite } from "@/models/Invites";
import { newInvite } from "@/services/db/invites";

export async function POST(request: Request) {
  const body: { repo_id: string; user_id: string } = await request.json();
  const SECRET_KEY: jwt.Secret = process.env.TOKEN_ENCRYPTION_SECRET!;
  try {
    const session = await getServerSession(authOptions);

    if (session?.user.id != body.user_id) {
      return Response.json({ message: "Access Denied" }, { status: 403 });
    }

    const user = await getUser(session.user.id ?? "0");

    const repo: IRepo = await getRepo(user.token, body.repo_id);

    if (!repo) {
      return Response.json({ message: "Access Denied" }, { status: 403 });
    }

    const hash = await generateUniqueHash();
    const now = new Date();
    const data: IToken = {
      user_id: Number(body.user_id),
      repo_id: Number(body.repo_id),
      created_on: now,
      expiry: 24,
      hash: hash,
    };
    const token = await generateToken(data, SECRET_KEY);
    const encoded = await encodeToUrlSafeBase64(token);

    const invite = {
      repo_id: Number(body.repo_id),
      user: "",
      status: "Pending",
      token: hash,
      owner: Number(body.user_id),
      created_on: now,
      expiry: 24,
    } as IInvite;

    await newInvite(invite);
    return Response.json({ token: encoded });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
