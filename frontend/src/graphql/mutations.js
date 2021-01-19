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

const CREATE_JOB_MUTATION = gql`
    mutation mutate (
        $time: String
        $member: String
        $group: String
        $job: String
        $place: String
        $note: String
    ){
        addJob(data: {
            time: $time
            member: $member
            group: $group
            job: $job
            place: $place
            note: $note
        })
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
        $mutation: String!
        $classlist: [ClassInput]
    ){
        addClass(data: {
            classlist: $classlist
            mutation: $mutation
        })
    }
`
const ADD_CALENDAR_MUTATION = gql`
    mutation mutate(
        $username: String!
        $year: Int!
        $month: Int!
        $todoList: [[String]]
    ){
        addCalendar(data:{
            username: $username
            year: $year
            month: $month
            todoList: $todoList
        })
    }
`


const ADD_TODO_MUTATION = gql`
    mutation mutate(
        $username: String!
        $userclass: String!
        $todolist: [todoItemInput]
        $mutation: String!
        $todoitem: todoItemInput
    ) {
        addTodo(data: {
            username: $username
            userclass: $userclass
            todolist: $todolist
            mutation: $mutation
            todoitem: $todoitem
        })
    }
`
export  {CREATE_USER_MUTATION, SET_ENDDATE_MUTATION, ADD_CLASS_MUTATION,  
        ADD_CALENDAR_MUTATION, ADD_TODO_MUTATION, CREATE_JOB_MUTATION}