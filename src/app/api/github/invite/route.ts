import { IRepo } from "@/models/Repo";
import { authOptions } from "@/services/auth";
import { getUser } from "@/services/db/users";
import { getRepo } from "@/services/github";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { getInvites } from "@/services/db/invites";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const repo_id = request.nextUrl.searchParams.get("repo_id");
  const user_id = request.nextUrl.searchParams.get("user_id");
  const page = request.nextUrl.searchParams.get("page") ?? 0;

  try {
    const session = await getServerSession(authOptions);

    if (session?.user.id != user_id) {
      return Response.json({ message: "Access Denied" }, { status: 403 });
    }

    const user = await getUser(session!.user.id ?? "0");

    const repo: IRepo = await getRepo(user.token, repo_id!);

    if (!repo) {
      return Response.json({ message: "Access Denied" }, { status: 403 });
    }

    const invites = await getInvites(repo.id.toString(), Number(page));
    return Response.json({ invites });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
