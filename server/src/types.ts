import { ObjectId } from 'mongodb';

export interface UserDocument {
  _id?: ObjectId;
  username: string;
  password: string;
  email: string;
  registrationDate?: Date;
  accountStatus?: string;
  roles?: string[];
}

export interface Context {
  loggedInUser: UserDocument
}