import axios from 'axios'


import { useQuery, useMutation } from '@apollo/client';
import  {USERS_QUERY, TODOS_QUERY, ONE_USER_QUERY, SUBUSER_QUERY, ENDDATE_QUERY, CALENDAR_QUERY, CLASSES_QUERY} from './graphql/queries'
import {CREATE_USER_MUTATION, SET_ENDDATE_MUTATION, ADD_CALENDAR_MUTATION} from './graphql/mutations'
import { useState, useEffect } from 'react';

const instance = axios.create({ baseURL: 'http://localhost:4000' });

const GetUsers = () => { 
    const {loading, error, data} = useQuery(USERS_QUERY)
    return data
}

const GetClasses = () => { 
    const {loading, error, data, refetch} = useQuery(CLASSES_QUERY)
    const [toget, setToGet] = useState(false)
    useEffect(() => {   
        if(toget){
            refetch()
            setToGet(false)
        }
    }, [toget])
    return {data,setToGet}
}

const GetEnddate = () => { 
    const {loading, error, data} = useQuery(ENDDATE_QUERY)
    // console.log("get enddate")
    return data
}

const GetSubClass = (username) => { 
    const {loading, error, data} = useQuery(SUBUSER_QUERY,  {variables: {username: username}})
    return data
}

const NewUser = () => {
    const [addUser, {data}] = useMutation(CREATE_USER_MUTATION)
    const [isSuccess, setIsSuccess] = useState(false)
    useEffect(()=>{
        if (data){ setIsSuccess(data.addUser.success) }
    }, [data])
    const createUser = (userinfo) => {
        const {username, password, userclass} = userinfo
        addUser({ variables: {
                username: username,
                password: password,
                userclass: userclass
        }})

    }
    return {createUser, isSuccess}
}

const SetEnddate = () => {
    const [setEnddate, {data}] = useMutation(SET_ENDDATE_MUTATION)
    const [isSuccess, setIsSuccess] = useState(false)
    useEffect(()=>{
        if (data){ 
            // console.log(data)
            setIsSuccess(data.setEnddate.success) 
        }
    }, [data])
    const newEnddate = async (date) => {
        if(date){
            // console.log(date)
            const x = await setEnddate({ variables: {
                enddate: date,
            }})
        }
    }
    return {newEnddate, isSuccess}
}

const UserLogin = () => {
    // for login, loginSuccess (true, false), login: function
    const [userName, setUserName] = useState("")
    const [passWord, setPassWord] = useState("")
    const [loginSuccess, setLoginSuccess] = useState(false);
    const {loading, error, data} = useQuery(ONE_USER_QUERY,  {variables: {username: userName}})
    const login = (userinfo) => {
        if (userinfo === false){
            setLoginSuccess(false);
            setUserName("");
            setPassWord("");
        }else{
            const {username, password} = userinfo
            setUserName(username);
            setPassWord(password);
        }
    }

    useEffect(() => {
        if (data){
            if (data.getOneUser.success === true && data.getOneUser.user.password === passWord){
                setLoginSuccess(true)
            }else{
                setLoginSuccess(false)
            }
    }}, [data,login])
    return {loginSuccess, login}
}

const saveTodo = async(todoitem) => {
    console.log(todoitem)
    const { data } = await instance.post('/users/saveTodo', todoitem)
    console.log("save")
    return data.msg
}

const saveClass = async(classlist) => {
    console.log("save class")
    console.log(classlist)
    const { data } = await instance.post('/users/saveClass', classlist)
    return data.msg
}

const GetTodo = () => { 
    const [username, setUsername] = useState("")
    const [toget, setToGet] = useState(false)
    const {loading, error, data, refetch} = useQuery(TODOS_QUERY,{variables: { username }})
    useEffect(() => {   
        if(toget){
            refetch()
            setToGet(false)
        }
    }, [toget])
    return {data, setToGet, setUsername}
}

const GetCalendar = () => {
    
    const [username, setUserName] = useState("")
    const [year, setYear] = useState(-1)
    const [month, setMonth] = useState(-1)
    // const [todolist, setTodoList] = useState([])
    
    const {loading, error, data, refetch} = useQuery(CALENDAR_QUERY, {variables: {username: username, year: year, month: month}})
    const [setData] = useMutation(ADD_CALENDAR_MUTATION)
    
    const setRefetch = ({username, year, month}) => {
        console.log("setrefetch:", username, year, month)
        setYear(year)
        setMonth(month)
        setUserName(username)
    }
    useEffect(async () => {
        console.log("refetch calander!")
        await refetch({variables: {username: username, year: year, month: month}, fetchPolicy: 'no-cache'})
    }, [username, month, year])
    const addToCalendar = async ({username, year, month, todolist}) => {
        console.log("mutation calendar", username, year, month, todolist)
        await setData({variables: {username: username, year: year, month: month, todoList: todolist}})
        console.log("refetch calendar!")
        await refetch({variables: {username: username, year: year, month: month}, fetchPolicy: 'no-cache'})

    }
    
    useEffect(() => {
        console.log("axios/getcalendar, data:", data)
    }, [JSON.stringify(data)])
    return {data, setRefetch, addToCalendar}
}


export { GetUsers, NewUser, UserLogin, saveTodo, GetTodo, GetSubClass, SetEnddate, GetEnddate, GetCalendar, GetClasses, saveClass};
