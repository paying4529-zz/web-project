import { gql } from 'apollo-boost'

const TODO_SUBSCRIPTION = gql`
    subscription subTodo($username: String!){
        subTodo(username: $username) {
            mutation
            todolist {
                fromName
                deadline
                value
                isComplete
                order
              }
        }

    }
`
export {TODO_SUBSCRIPTION }