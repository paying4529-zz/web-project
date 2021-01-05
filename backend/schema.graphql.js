import pkg from 'graphql'
const  { buildSchema } = pkg
const schema = buildSchema(`
    type Query {
        getUsers: [User!]
        getOneUser(username: String!): getOneUserOutput!
        getTodos(query: getTodoInput): [User]
    }

    type Mutation {
        addUser(data: addUserInput): addUserOutput!
    }

    type Todo {
        username: String!
        userclass: String!
        itemslist: [TodoItem]
    }

    type TodoItem {
        value: String!
        isComplete: Boolean!
        id: Int!
    }

    type User {
        username: String!
        password: String!
        userclass: String!
        todolist: [TodoItem]
    }

    type addUserOutput {
        user: User,
        success: Boolean!
    }

    type getOneUserOutput {
        user: User,
        success: Boolean!
    }
    
    input getTodoInput {
        username: String!
    }

    input addUserInput {
        username: String!
        password: String!
        userclass: String!
    }

`);
export default schema