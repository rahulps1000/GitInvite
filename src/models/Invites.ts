import mongoose, { Document, Schema } from "mongoose";

export interface IInvite extends Document {
  repo_id: number;
  user: string;
  status: string;
  token: string;
  owner: number;
  created_on: Date;
  expiry: number;
  hash: string;
}

const inviteSchema: Schema = new mongoose.Schema({
  repo_id: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  token: {
    type: String,
    required: true,
  },
  owner: {
    type: Number,
    required: true,
  },
  created_on: {
    type: Date,
    required: true,
  },
  expiry: {
    type: Number,
    required: true,
    default: 24,
  },
  hash: {
    type: String,
    required: true,
  },
});

const Invite =
  mongoose.models.Invite || mongoose.model<IInvite>("Invite", inviteSchema);

export interface IInvites {
  invites: Array<IInvite>;
  limit: number;
  page: number;
  total: number;
}

export default Invite;
