import gql from "graphql-tag";

export const CREATE_TASK = gql`
  mutation ($title: String, $projectId: ID, $done: Boolean) {
    createTask(title: $title, projectId: $projectId, done: $done) {
      title
      done
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
  mutation UpdateTask(
    $id: ID!
    $title: String!
    $projectId: ID!
    $done: Boolean
  ) {
    updateTask(_id: $id, title: $title, projectId: $projectId, done: $done) {
      _id
      title
      done
      project {
        _id
      }
    }
  }
`;
