import { gql } from 'apollo-boost'

const USERS_QUERY = gql`
  query {
    getUsers {
      username
      password
      userclass
    }
  }
`
const TODOS_QUERY = gql`
  query getTodos($username: String!) {
    getTodos(username: $username) {
      username
      userclass
      todolist{
        value
        isComplete
        order
      }
    }
  }
`
const ONE_USER_QUERY = gql`
  query getOneUser ($username: String!) {
    getOneUser(username: $username) {
      success
      user {
        password
      }
    }
  }
`

export { USERS_QUERY, TODOS_QUERY, ONE_USER_QUERY}