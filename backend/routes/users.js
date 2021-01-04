import express from "express"
import User from '../models/user.js'
import Todo from '../models/todo.js'

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

const getTodo = async (username, res) => {
    const x = await Todo.find({username: username}).limit(100).sort({ _id: 1 })  
    if(res){
      const data = { msg: 'success', contents: x }
      res.status(200).send(data)
    }else{
      const data = { msg: 'fail', contents: [] }
      res.status(200).send(data)
    } 
}

const saveTodo = (todoitem, res) => {
    const name = todoitem.username
    Todo.countDocuments({username: name}, (err, count) => {
        if (count){ 
            console.log(count)
            Todo.deleteOne({ username: name },()=>{}) }
        const todo = new Todo(todoitem);
        todo.save((err) => {
            if (err) console.error(err);
            else{
                const data = { msg: `${name}'s todo saved!!!`}
                res.status(200).send(data)
            }
        });
    });
};

const getSubClass = async (username, res) => {
    console.log(username)
    const result = await User.find({username: username},()=>{});
    const userClass = result[0].userclass
    if(userClass==="general director"){
        const userList = await User.find({$or:[{userclass:"section manager"},{userclass:"group member"}]},()=>{}).limit(100)
        if (userList.length){ 
            const list = userList.map(r=>r.username)
            const data = {contents: list}
            res.status(200).send(data);
        }
    }
    else if(userClass==="section manager"){
        const userList = await User.find({userclass:"group member"},()=>{}).limit(100)
        if (userList.length){ 
            const list = userList.map(r=>r.username)
            const data = {contents: list}
            res.status(200).send(data);
        }
    }
    else if(userClass==="group member"){
        const data = {contents: []}
        res.status(200).send(data);
    }
}

router.post("/getsubclass",(req,res)=>{
    if(res){
        var username = req.body.username
        getSubClass(username,res)
    } 

})

router.post("/getTodo", (req,res)=>{
    if(res){
        var username = req.body.username
        getTodo(username,res)
    } 
})

router.post("/saveTodo", (req, res)=>{
    if(res){
        var todoitem = req.body
        saveTodo(todoitem, res)
    }else{
        const data = { msg: 'Fail to save todo' }
        res.status(403).send(data)  
    }
})

router.post('/register', (req, res) => {
    if(res){
        var userinfo = req.body
        saveUser(userinfo,res)
    }else{
        const data = { msg: 'Fail to register' }
        res.status(200).send(data)  
    }
});

router.post('/login', (req, res) => {
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
    else{ res.status(500).send([]); }
});   
export default router