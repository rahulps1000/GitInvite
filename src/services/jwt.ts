"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { Buffer } from "buffer";
import crypto from "crypto";
import { IToken } from "@/models/Token";
import {
  InvalidToken,
  LinkExpired,
  TamperedToken,
  InviteAlreadyConsumed,
} from "@/models/Exceptions";
import { getInvite } from "./db/invites";

export const generateToken = async (
  payload: IToken,
  secret: string
): Promise<string> => {
  return jwt.sign(payload, secret);
};

export const verifyAndDecryptToken = async (
  token: string,
  secret: string
): Promise<IToken | null> => {
  let data;
  try {
    data = jwt.verify(token, secret) as IToken;
  } catch (error) {
    console.error(error);

    throw new TamperedToken();
  }
  const newDate = new Date(data.created_on);
  const expiry = Number(data.expiry);
  newDate.setTime(newDate.getTime() + expiry * 60 * 60 * 1000);

  if (newDate < new Date()) {
    throw new LinkExpired();
  }

  const invite = await getInvite(data.hash, data.repo_id.toString());
  if (invite.status !== "Pending" || invite.user !== "") {
    throw new InviteAlreadyConsumed();
  }

  return data;
};

export async function encodeToUrlSafeBase64(data: string): Promise<string> {
  return Buffer.from(data).toString("base64url");
}

export async function decodeFromUrlSafeBase64(data: string): Promise<string> {
  try {
    return Buffer.from(data, "base64url").toString("utf8");
  } catch (error) {
    console.error(error);

    throw new InvalidToken();
  }
}

export async function generateUniqueHash(): Promise<string> {
  const timestamp = Date.now().toString();
  const hash = crypto.createHash("sha256");
  hash.update(timestamp);
  return hash.digest("hex");
}
