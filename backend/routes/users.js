import express from "express"
import User from '../models/user.js'

const router =  express.Router();

const saveUser = (userinfo,res) => {
    const name = userinfo.username
    User.countDocuments({username: name}, (err, count) => {
        if (count){
            const data = { msg: `name "${name}" exists!!`}
            res.status(200).send(data)
        } else {
            const user = new User(userinfo);
            user.save((err) => {
                if (err) console.error(err);
                else{
                    const data = { msg: `new user "${name}" saved!!!`}
                    res.status(200).send(data)
                }
            });
        }
    });
};

const userLogin = (userinfo,res) => {
    const name = userinfo.username
    const password = userinfo.password
    User.find({username: name}, (err, result) => {
        if (result.length){
            if(password === result[0].password){
                const data = { msg: `correct password`}
                res.status(200).send(data)
            }
            else{
                const data = { msg: `wrong password`}
                res.status(200).send(data)
            }
        } else {
            const data = { msg: `please register first.`}
            res.status(200).send(data)
        }
    });
};

router.post('/register', (req, res) => {
    // console.log('POST HTTP method on users resource');
    if(res){
        var userinfo = req.body
        saveUser(userinfo,res)
    }else{
        const data = { msg: 'Fail to register' }
        res.status(200).send(data)  
    }
});

router.post('/login', (req, res) => {
    // console.log('POST HTTP method on users resource');
    if(res){
        var userinfo = req.body
        userLogin(userinfo,res)
    }else{
        const data = { msg: 'Fail to login' }
        res.status(200).send(data)  
    }
});

router.get('/', async (req, res) => {
    const userList = await User.find();
    if (userList.length){
        const data = {contents: userList}
        res.status(200).send(data);
    }    
    else{
        res.status(500).send([]);
    }
});
   
export default router