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
export  {CREATE_USER_MUTATION}