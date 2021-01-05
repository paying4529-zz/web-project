import axios from 'axios'


import { useQuery, useMutation } from '@apollo/client';
import  {USERS_QUERY, TODOS_QUERY, ONE_USER_QUERY} from './graphql/queries'
import {CREATE_USER_MUTATION} from './graphql/mutations'
import { useState, useEffect } from 'react';

const instance = axios.create({ baseURL: 'http://localhost:4000' });

const GetUsers = () => { 
    const {loading, error, data} = useQuery(USERS_QUERY)
    console.log("getusers")
    return data
}

const GetSubClass = async (username) => { 
    const { data } = await instance.post('/users/getsubclass', { username }); 
    return data.contents;
}

const NewUser = () => {
    const [addUser, {data}] = useMutation(CREATE_USER_MUTATION)
    const [isSuccess, setIsSuccess] = useState(false)
    useEffect(()=>{
        if (data){ setIsSuccess(data.addUser.success) }
    }, [data])
    const createUser = (userinfo) => {
        const {username, password, userclass} = userinfo
        console.log("create user")
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
    const [userName, setUserName] = useState("");
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
        console.log("login data:", data)
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
    const { data } = await instance.post('/users/saveTodo', todoitem)
    return data.msg
}

const GetTodo = (username) => { 
    console.log("in get todo")
    const {loading, error, data} = useQuery(TODOS_QUERY,{variables: { username }})
    if(data){console.log(data)}
    return data
}


export { GetUsers, NewUser, UserLogin, saveTodo, GetTodo, GetSubClass };
