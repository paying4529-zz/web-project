import pkg from 'graphql'
const  { buildSchema } = pkg
const schema = buildSchema(`
    type Query {
        getUsers: [User!]
        getSubusers(username: String!): [User!]
        getOneUser(username: String!): getOneUserOutput!
        getTodos(username: String!): [User]
        getEnddate: Date
        getCalendar(data: getCalendarInput!): [[String]]
        getClasses: getClassOutput
    }

    type Mutation {
        addUser(data: addUserInput): addUserOutput!
        setEnddate(data: setEnddateInput): setOutput!
        addCalendar(data: addCalendarInput): Boolean!
        addClass(data: addClassInput): setOutput!
        addTodo(data: addTodoInput): Boolean!
    }

    type Subscription {
        sendTodoDone(manager: String!): TodoSubPayload!
        subTodo(userclass: String!): TodoSubPayload
    }

    enum MutationType{
        CREATED
        MODIFIED
        DELETED
    }
      
    type TodoSubPayload {
        mutation: MutationType!
        todo: TodoItem!
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


    input todoItemInput {
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

    type Class {
        label: String,
        value: String
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

    input addClassInput {
        group: String
        classname: String
    }

    input getCalendarInput {
        username: String
        year: Int
        month: Int
    }

    input addCalendarInput {
        username: String
        year: Int
        month: Int
        todoList: [[String]]
    }

    input addTodoInput {
        username: String!
        userclass: String!
        todolist: [todoItemInput]
    }
    
    type setOutput {
        success: Boolean!
    }

    type getClassOutput{
        classlist: [Class]
    }
`);
export default schema