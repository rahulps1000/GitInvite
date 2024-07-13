"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { Buffer } from "buffer";
import crypto from "crypto";
import { IToken } from "@/models/Token";

export const generateToken = async (
  payload: IToken,
  secret: string
): Promise<string> => {
  return jwt.sign(payload, secret);
};

export const verifyAndDecryptToken = async (
  token: string,
  secret: string
): Promise<JwtPayload | null> => {
  const data = jwt.verify(token, secret) as JwtPayload;
  const newDate = new Date(data["created_on"]);
  const expiry = Number(data["expiry"]);
  newDate.setTime(newDate.getTime() + expiry * 60 * 60 * 1000);

  if (newDate < new Date()) {
    throw new LinkExpired();
  }

  return data;
};

export async function encodeToUrlSafeBase64(data: string): Promise<string> {
  return Buffer.from(data).toString("base64url");
}

export async function decodeFromUrlSafeBase64(data: string): Promise<string> {
  return Buffer.from(data, "base64url").toString("utf8");
}

export async function generateUniqueHash(): Promise<string> {
  const timestamp = Date.now().toString();
  const hash = crypto.createHash("sha256");
  hash.update(timestamp);
  return hash.digest("hex");
}
