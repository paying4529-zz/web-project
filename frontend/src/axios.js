import axios from 'axios'


import { useQuery, useMutation } from '@apollo/client';
import  {USERS_QUERY, TODOS_QUERY, ONE_USER_QUERY,SUBUSER_QUERY} from './graphql/queries'
import {CREATE_USER_MUTATION} from './graphql/mutations'
import { useState, useEffect } from 'react';

const instance = axios.create({ baseURL: 'http://localhost:4000' });

const GetUsers = () => { 
    const {loading, error, data} = useQuery(USERS_QUERY)
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


export { GetUsers, NewUser, UserLogin, saveTodo, GetTodo, GetSubClass };
