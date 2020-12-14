import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000' });

const clickToGet = async () => { 
    const { data } = await instance.get('/users'); 
    return data.contents.map(e=>(
        <div>{e.username+"||"+e.password+"||"+e.userclass}</div>
    ));
}

const GetSubClass = async (username) => { 
    console.log("11111111")
    const { data } = await instance.post('/users/getsubclass', { username }); 
    console.log(data)
    return data.contents;
}

const newuser = async(userinfo) => {
    const { data } = await instance.post('/users/register', userinfo)
    return data.msg
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

export { clickToGet, newuser, userlogin, saveTodo, getTodo, GetSubClass };
