import e from "express";
import express from "express"
import User from '../models/user.js'

const router =  express.Router();

const saveUser = (userinfo,res) => {
    const name = userinfo.username
    User.countDocuments({username: name}, (err, count) => {
        if (count){
            console.log(count)
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

router.post('/', (req, res) => {
    // console.log('POST HTTP method on users resource');
    if(res){
        var userinfo = req.body
        saveUser(userinfo,res)
    }else{
        const data = { msg: 'Fail to register' }
        res.status(200).send(data)  
    }
});
router.put('/:userId', (req, res) => {
    res.send(`PUT HTTP method on users/${req.params.userId} resource`)
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