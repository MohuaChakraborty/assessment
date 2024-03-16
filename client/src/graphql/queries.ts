import { gql } from "@apollo/client";

export const GET_USERS = gql`
query GetUsers {
  users {
    _id
    username
    password
    email
  }
}
`;

export const GET_USER = gql`
query getUser ($id: ID!) {
  user(_id: $id) {
    _id
    username
    email
    password
  }
}
`;

export const ADD_USER = gql`
mutation AddUser($username: String, $password: String, $email: String) {
  addUser(username: $username, password: $password, email: $email){
        username
        password
        email
  }
}
`;