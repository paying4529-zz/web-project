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
    getTodos(query: { username: $username }) {
      username
      userclass
      itemslist{
        value
        isComplete
        id
      }
    }
  }
`

export { USERS_QUERY, TODOS_QUERY}