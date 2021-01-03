import axios from 'axios'


import { useQuery, useMutation } from '@apollo/client';
import  USERS_QUERY from './graphql/users_query'
import CREATE_USER_MUTATION from './graphql/create_user_mutation'
import { useState, useEffect } from 'react';

const instance = axios.create({ baseURL: 'http://localhost:4000' });

const GetUsers = () => { 
    const {loading, error, data} = useQuery(USERS_QUERY)
   
    return {data}
}

const GetSubClass = async (username) => { 
    console.log("11111111")
    const { data } = await instance.post('/users/getsubclass', { username }); 
    console.log(data)
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

async function getTodo(username){
    const { data } = await instance.post('/users/getTodo', { username })
    return data
}

export { GetUsers, NewUser, userlogin, saveTodo, getTodo, GetSubClass };
