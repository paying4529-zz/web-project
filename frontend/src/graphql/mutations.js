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

const ADD_CLASS_MUTATION = gql`
    mutation mutate (
        $group: String!
        $classname: String!
    ){
        addClass(data: {
            group: $group
            classname: $classname
        }) {
            success
        }
    }
`

export  {CREATE_USER_MUTATION, SET_ENDDATE_MUTATION, ADD_CLASS_MUTATION}