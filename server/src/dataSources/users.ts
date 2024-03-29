import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ObjectId } from 'mongodb';
import { UserDocument, Context } from '../types';

export default class Users extends MongoDataSource<UserDocument, Context> {

  getUsers() {
    return this.collection.find().toArray();
  }

  getUser(userId: ObjectId) {
    return this.collection.findOne({ _id: new ObjectId(userId) });
  }

  async getUserByEmail(email: string) {
    return this.collection.findOne({ email });
  }

  addUser(username: string, password: string, email: string) {
    return this.collection.insertOne({
      username,
      password,
      email,
      registrationDate: new Date(),
      accountStatus: "active",
      roles: ["user"]
    });
  }  

  async deleteUser(userId: ObjectId) {
    const deletedUser = await this.collection.findOneAndDelete({ _id: new ObjectId(userId) });
    return deletedUser.value;
  }
}
