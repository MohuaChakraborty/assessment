import mongoose, { ObjectId } from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { GraphQLError } from 'graphql';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { User as UserModel } from './models/user.js';
import Users from './dataSources/users.js';
import pkg from 'body-parser';
import serverless from 'serverless-http';

const { json } = pkg;

await mongoose.connect('mongodb://127.0.0.1:27017/ragnemt');

const app = express();
const httpServer = http.createServer(app);

const typeDefs = `#graphql
  type User {
    _id: ID!
    username: String
    password: String
    email: String
  }
  type Query {
    users: [User]
    user(_id: ID!): User
  }
  type Mutation {
    addUser(username: String, password: String, email: String): User
    deleteUser(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    users: (_parent: any, _args: any, { dataSources }: any) => {
      return dataSources.users.getUsers();
    },
    user: (_parent: any, { _id }: any, { dataSources }: any) => {
      return dataSources.users.getUser(_id)
        .then((res: any) => {
          if (!res) {
            throw new GraphQLError(
              `User with User Id ${_id} does not exist.`
            );
          }
          return res;
        });
    },
  },
  Mutation: {
    addUser: (_parent: any, { username, password, email }: any, { dataSources }: any) => {
      return dataSources.users.addUser(username, password, email)
        .then((res: any) => ({ _id: res.insertedIds[0], username, password, email }))
    },
    deleteUser: (_parent: any, { id }: any, { dataSources }: any) => {
      return dataSources.users.deleteUser(id)
        .then((deletedUser: any) => {
          if (!deletedUser) {
            throw new GraphQLError(`User with ID ${id} does not exist.`);
          }
          return deletedUser;
        });
    }
  }
}

interface MyContext {
  dataSources?: {
    users: Users;
  };
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
});
await server.start();

app.use(
  cors<cors.CorsRequest>(),
  json(),
  expressMiddleware(server, {
    context: async ({ req }: any) => ({
      token: req.headers.token,
      dataSources: {
        users: new Users(await UserModel.createCollection())
      }
    }),    
  }),
);

let handler: any;
if (process.env.NODE_ENV === 'production') {
  handler = serverless(app);
} else {
  app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000`))
}

export { handler };

