import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  id: number;
  name: string;
  email: string;
  login: string;
  token: string;
}

const userSchema: Schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  login: {
    type: String,
    required: false,
  },
  token: {
    type: String,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
