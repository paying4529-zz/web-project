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
const MSG_SUBSCRIPTION = gql`
    subscription subMsg($username: String!){
        subMsg(username: $username) {
            mutation
            sender
            todoitem {
                value
            }
        }
    }
`
export { TODO_SUBSCRIPTION, MSG_SUBSCRIPTION }