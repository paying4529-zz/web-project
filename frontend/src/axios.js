import axios from 'axios'


import { useQuery, useMutation } from '@apollo/client';
import  {USERS_QUERY, TODOS_QUERY} from './graphql/queries'
import {CREATE_USER_MUTATION} from './graphql/mutations'
import { useState, useEffect } from 'react';

const instance = axios.create({ baseURL: 'http://localhost:4000' });

const GetUsers = () => { 
    const {loading, error, data} = useQuery(USERS_QUERY)
    console.log("getusers")
    console.log(data)
    return {data}
}

const GetSubClass = async (username) => { 
    const { data } = await instance.post('/users/getsubclass', { username }); 
    return data.contents;
}

const NewUser = () => {
    const [addUser, {data}] = useMutation(CREATE_USER_MUTATION)
    const [isSuccess, setIsSuccess] = useState(false)
    useEffect(()=>{
        if (data){
            setIsSuccess(data.addUser.success)
        }
    }, [data])
    const createUser = (userinfo) => {
        const {username, password, userclass} = userinfo
        console.log("create user")
        console.log(username, password, userclass)
        addUser({
            variables: {
                username: username,
                password: password,
                userclass: userclass
            }
        })

    }

    return {createUser, isSuccess}
}

const userlogin = async(userinfo) => {
    const { data } = await instance.post('/users/login', userinfo)
    return data.msg
}

const saveTodo = async(todoitem) => {
    const { data } = await instance.post('/users/saveTodo', todoitem)
    return data.msg
}

const GetTodo = (username) => { 
    console.log("in get todo")
    const {loading, error, data} = useQuery(TODOS_QUERY,{variables: { username }})
    return data
}


export { GetUsers, NewUser, userlogin, saveTodo, GetTodo, GetSubClass };
