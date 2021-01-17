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

const CLASSES_QUERY = gql`
  query {
    getClasses {
      group
      classname
    }
  }
`

const ENDDATE_QUERY = gql`
  query {
    getEnddate {
      enddate
    }
  }
`
const TODOS_QUERY = gql`
  query getTodos($username: String!) {
    getTodos(username: $username) {
      username
      userclass
      todolist{
        fromName
        deadline
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
const SUBUSER_QUERY = gql`
  query getSubusers($username: String!) {
    getSubusers(username: $username) {
      username
      userclass
    }
  }
`
const CALENDAR_QUERY = gql`
  query getCalendar(
      $username: String
      $year: Int
      $month: Int
      ) {
        getCalendar(data: {
          username: $username
          year: $year
          month: $month
        })
  }
`

export { USERS_QUERY, TODOS_QUERY, ONE_USER_QUERY, SUBUSER_QUERY, ENDDATE_QUERY,  CALENDAR_QUERY, CLASSES_QUERY }