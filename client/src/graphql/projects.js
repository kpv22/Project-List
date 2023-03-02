import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query getProjects {
    projects {
      _id
      name
      description
    }
  }
`;

export const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(_id: $id) {
      _id
      name
      description
      createdAt
      tasks {
        _id
        title
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation ($name: String, $description: String) {
    createProject(name: $name, description: $description) {
      _id
      name
      createdAt
    }
  }
`;

export const DELETED_PROJECT = gql`
  mutation ($id: ID!) {
    deleteProject(_id: $id) {
      name
      description
      _id
      createdAt
    }
  }
`;

export const UPDATED_PROJECT = gql`
  mutation ($id: ID!, $name: String!, $description: String) {
    updateProject(_id: $id, name: $name, description: $description) {
      _id
      description
      name
      tasks {
        title
        _id
      }
    }
  }
`;
