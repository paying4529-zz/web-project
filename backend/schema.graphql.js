import pkg from 'graphql'
const  { buildSchema } = pkg
const schema = buildSchema(`
    type Query {
        getUsers: [User!]
        getOneUser(username: String!): getOneUserOutput!
        getTodos(username: String!): [User]
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
        order: Int!
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
    
    input addUserInput {
        username: String!
        password: String!
        userclass: String!
    }

`);
export default schema