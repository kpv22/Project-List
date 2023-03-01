import gql from "graphql-tag";

export const CREATE_TASK = gql`
  mutation ($title: String, $projectId: ID) {
    createTask(title: $title, projectId: $projectId) {
      title
      project {
        _id
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation ($id: ID!) {
    deleteTask(_id: $id) {
      _id
      title
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $title: String!, $projectId: ID!) {
    updateTask(_id: $id, title: $title, projectId: $projectId) {
      _id
      title
      project {
        _id
      }
    }
  }
`;
