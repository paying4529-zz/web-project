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
export default USERS_QUERY