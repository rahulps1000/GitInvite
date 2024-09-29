import dbConnect from "./client";
import Invite, { IInvite, IInvites } from "@/models/Invites";

export async function newInvite(invite: IInvite) {
  await dbConnect();
  await Invite.create(invite);
}

export async function getInvite(hash: string, repo_id: string): Promise<any> {
  await dbConnect();
  const i = await Invite.findOne({ repo_id: Number(repo_id), hash: hash });
  return i;
}

export async function getOwnerId(
  token: string,
  repo_id: string
): Promise<number> {
  await dbConnect();
  const i = await Invite.findOne({ repo_id: Number(repo_id), hash: token });
  return i.owner;
}

export async function getInvites(
  repo_id: string,
  page: number = 0,
  limit: number = 5
): Promise<IInvites> {
  await dbConnect();
  const invites = await Invite.find({ repo_id: Number(repo_id) })
    .limit(limit)
    .skip(limit * page);

  const total = await Invite.find({
    repo_id: Number(repo_id),
  }).countDocuments();

  return { invites, limit, page, total };
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

export async function validateInvite(hash: string, repo_id: string) {
  await dbConnect();
  const i = await Invite.findOne({
    repo_id: Number(repo_id),
    hash: hash,
  });
  if (!i) {
    return false;
  }
  const now = new Date();
  const diff = now.getTime() - i.created_on.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours > i.expiry) {
    return false;
  }
  if (i.status !== "Pending" || i.user !== "") {
    return false;
  }
  return true;
}

export async function processInvite(
  hash: string,
  repo_id: string,
  owner: string,
  user: string
) {
  await dbConnect();
  const i = await Invite.findOneAndUpdate(
    { repo_id: Number(repo_id), hash: hash, owner: Number(owner) },
    { status: "Invited", user: user }
  );
  return !!i;
}
