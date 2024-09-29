import User, { IUser } from "@/models/User";
import dbConnect from "./client";

export async function addOrUpdateUser(user: IUser) {
  await dbConnect();
  const u = await User.findOne({ id: user.id });
  if (u) {
    await User.findOneAndUpdate({ id: user.id }, { token: user.token });
  } else {
    await User.create(user);
  }
}

export async function getUser(id: string): Promise<IUser> {
  await dbConnect();
  const u = await User.findOne({ id: Number(id) });
  return u;
}
