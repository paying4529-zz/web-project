import { gql } from 'apollo-boost'

const CREATE_USER_MUTATION = gql`
    mutation mutate (
        $username: String!
        $password: String!
        $userclass: String!
    ){
        addUser(data: {
            username: $username
            password: $password
            userclass: $userclass
        }) {
            success
        }
    }
`

const SET_ENDDATE_MUTATION = gql`
    mutation mutate (
        $enddate: String!
    ){
        setEnddate(data: {
            enddate: $enddate
        }) {
            success
        }
    }
`

export  {CREATE_USER_MUTATION, SET_ENDDATE_MUTATION}