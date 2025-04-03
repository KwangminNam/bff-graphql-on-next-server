import gql from "graphql-tag";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

export { GET_USERS };