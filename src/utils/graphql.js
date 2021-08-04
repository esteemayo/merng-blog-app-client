import { gql } from '@apollo/client';

const FETCH_BLOGS_QUERY = gql`
  {
    getBlogs {
      id
      content
      username
      createdAt
      comments {
        id
        commentBody
        username
        createdAt
      }
      commentCount
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

const FETCH_BLOG_QUERY = gql`
  query getBlog($blogId: ID!) {
    getBlog(blogId: $blogId) {
      id
      content
      username
      createdAt
      comments {
        id
        commentBody
        username
        createdAt
      }
      commentCount
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

const CREATE_BLOG_MUTATION = gql`
  mutation createBlog($content: String!) {
    createBlog(content: $content) {
      id
      content
      username
      createdAt
      comments {
        id
        commentBody
        username
        createdAt
      }
      commentCount
      likes {
        id
        username
        createdAt
      }
      likeCount
    }
  }
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($blogId: ID!, $commentBody: String!) {
    createComment(blogId: $blogId, commentBody: $commentBody) {
      id
      commentCount
      comments {
        id
        commentBody
        username
        createdAt
      }
    }
  }
`;

const LOGIN_USER_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      username
      email
      token
      createdAt
    }
  }
`;

const REGISTER_USER_MUTATION = gql`
  mutation register(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    register(
      registerInput: {
        name: $name
        username: $username
        email: $email
        password: $password
        passwordConfirm: $passwordConfirm
      }
    ) {
      id
      name
      username
      email
      token
      createdAt
    }
  }
`;

const LIKE_BLOG_MUTATION = gql`
  mutation likeBlog($blogId: ID!) {
    likeBlog(blogId: $blogId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

const UPDATE_BLOG_MUTATION = gql`
  mutation updateBlog($blogId: ID!, $content: String!) {
    updateBlog(blogId: $blogId, content: $content) {
      id
      content
      username
      comments {
        id
        commentBody
        username
        createdAt
      }
      commentCount
      likes {
        id
        username
        createdAt
      }
      likeCount
    }
  }
`;

const DELETE_BLOG_MUTATION = gql`
  mutation deleteBlog($blogId: ID!) {
    deleteBlog(blogId: $blogId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($blogId: ID!, $commentId: ID!) {
    deleteComment(blogId: $blogId, commentId: $commentId) {
      id
      commentCount
      comments {
        id
        commentBody
        username
        createdAt
      }
    }
  }
`;

export {
  FETCH_BLOGS_QUERY,
  FETCH_BLOG_QUERY,
  CREATE_BLOG_MUTATION,
  CREATE_COMMENT_MUTATION,
  LOGIN_USER_MUTATION,
  REGISTER_USER_MUTATION,
  UPDATE_BLOG_MUTATION,
  LIKE_BLOG_MUTATION,
  DELETE_BLOG_MUTATION,
  DELETE_COMMENT_MUTATION,
};
