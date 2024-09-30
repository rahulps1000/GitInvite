import { authOptions } from "@/services/auth";
import {
  getOwnerId,
  processInvite,
  validateInvite,
} from "@/services/db/invites";
import { getUser } from "@/services/db/users";
import { acceptInvite, inviteUser } from "@/services/github";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: {
    token: string;
    user_name: string;
    repo_id: string;
    type: string;
  } = await request.json();

  if (await validateInvite(body.token, body.repo_id)) {
    const ownerId = (await getOwnerId(body.token, body.repo_id)).toString();
    const owner = await getUser(ownerId);
    var username = body.user_name;
    let user_token;

    if (body.type === "auto") {
      const session = await getServerSession(authOptions);
      if (!session?.user) {
        return NextResponse.json({ message: "Access Denied" }, { status: 403 });
      }
      const user = await getUser(session.user.id);
      username = user.login;
      user_token = user.token;
    }
    if (owner.login === username) {
      return NextResponse.json({
        message: "You are the owner of the repository",
      });
    }
    await processInvite(body.token, body.repo_id, ownerId, username);
    const [repo_url, html_url] = await inviteUser(
      owner.token,
      body.repo_id,
      username
    );

    if (body.type === "auto") {
      try {
        await acceptInvite(user_token!, body.repo_id);
        return NextResponse.json({
          message: "Invitation Accepted",
          repo_url: repo_url,
          status: true,
        });
      } catch (error) {
        return NextResponse.json(
          { message: "Failed to Accept Invitation" },
          { status: 403 }
        );
      }
    }

    return NextResponse.json({
      message: "Invitation Sent",
      html_url: html_url,
      status: true,
    });
  }

  return NextResponse.json({ message: "Invalid Token" }, { status: 403 });
}
