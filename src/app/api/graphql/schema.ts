import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    user: User!
    userId: ID!
  }

  type User {
    id: ID!
    name: String!
    password: String!
    email: String!
    todos: [Todo!]!
  }

  type Query {
    todos: [Todo!]!
    todo(id: ID!): Todo
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createTodo(title: String!, userId: ID!): Todo!
    updateTodo(id: ID!, title: String, completed: Boolean): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`; 