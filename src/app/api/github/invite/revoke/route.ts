import { authOptions } from "@/services/auth";
import { getUser } from "@/services/db/users";

import { getServerSession } from "next-auth";
import { getOwnerId, updateStatus } from "@/services/db/invites";
import { revokeAccess } from "@/services/github";

export async function POST(request: Request) {
  const body: { repo_id: string; token: string; username: string } =
    await request.json();
  try {
    const session = await getServerSession(authOptions);

    const user = await getUser(session!.user.id ?? "0");
    const owner = await getOwnerId(body.token, body.repo_id);

    if (user.id !== owner) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    await revokeAccess(user.token, body.repo_id, body.username);
    await updateStatus(body.token, body.repo_id, "Revoked");
    return Response.json({ message: "Invite Revoked" });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
