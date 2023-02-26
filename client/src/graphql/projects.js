import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  {
    projects {
      _id
      name
      description
    }
  }
`;
