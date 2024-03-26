import mongoose, { Schema } from "mongoose";
import { ObjectId } from 'mongodb';

const userSchema = new Schema({
  _id: ObjectId,
  username: String,
  password: String,
  email: String,
  registrationDate: { type: Date, default: Date.now },
  lastLogin: Date,
  accountStatus: { type: String, default: "active" }, 
  roles: { type: [String], default: ["user"] }, 
  activityLog: [String] 
});

export const User = mongoose.model("user", userSchema);
