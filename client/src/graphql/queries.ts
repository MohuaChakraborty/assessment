import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      username
      password
      email
      registrationDate
      accountStatus
      roles
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(_id: $id) {
      _id
      username
      email
      registrationDate
      accountStatus
      roles
    }
  }
`;


export const ADD_USER = gql`
  mutation AddUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      username
      password
      email
      registrationDate
      accountStatus
      roles
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      _id
    }
  }
`;