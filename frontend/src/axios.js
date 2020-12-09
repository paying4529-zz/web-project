import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000' });

const clickToGet = async () => { 
    const { data } = await instance.get('/users'); 
    return data.contents.map(e=>(
        <div>{e.username+"||"+e.password+"||"+e.class}</div>
    ));
}

const newuser = async(userinfo) => {
    const { data } = await instance.post('/users', userinfo)
    return data.msg
}
export { clickToGet, newuser };
