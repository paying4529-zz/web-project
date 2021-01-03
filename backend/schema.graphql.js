import pkg from 'graphql'
const  { buildSchema } = pkg
const schema = buildSchema(`
    type Query {
        getUsers: [User!]
    }

    type Mutation {
        addUser(data: addUserInput): addUserOutput!
    }

    type User {
        username: String!
        password: String!
        userclass: String!
    }

    type addUserOutput {
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