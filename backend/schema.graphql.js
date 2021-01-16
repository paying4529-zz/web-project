import pkg from 'graphql'
const  { buildSchema } = pkg
const schema = buildSchema(`
    type Query {
        getUsers: [User!]
        getSubusers(username: String!): [User!]
        getOneUser(username: String!): getOneUserOutput!
        getTodos(username: String!): [User]
        getEnddate: Date
    }

    type Mutation {
        addUser(data: addUserInput): addUserOutput!
        setEnddate(data: setEnddateInput): setEnddateOutput!
    }

    type Todo {
        username: String!
        userclass: String!
        itemslist: [TodoItem]
    }

    type TodoItem {
        fromName: String!
        deadline: String
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

    type Date {
        enddate: String
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

    input setEnddateInput {
        enddate: String!
    }
    
    type setEnddateOutput {
        success: Boolean!
    }
`);
export default schema