import dbConnect from "./client";
import Invite, { IInvite } from "@/models/Invites";

export async function newInvite(invite: IInvite) {
  await dbConnect();
  await Invite.create(invite);
}

export async function getInvite(token: string, repo_id: string): Promise<any> {
  await dbConnect();
  const i = await Invite.findOne({ repo_id: Number(repo_id), token: token });
  return i;
}

export async function updateStatus(
  token: string,
  repo_id: string,
  status: string
) {
  await dbConnect();
  const i = await Invite.findOneAndUpdate(
    { repo_id: Number(repo_id), token: token },
    { status: status }
  );
  return !!i;
}

export async function processInvite(
  token: string,
  repo_id: string,
  user: string
) {
  await dbConnect();
  const i = await Invite.findOneAndUpdate(
    { repo_id: Number(repo_id), token: token },
    { status: "Invited", user: user }
  );
  return !!i;
}
