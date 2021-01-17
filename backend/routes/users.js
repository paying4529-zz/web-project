import express from "express"
import User from '../models/user.js'
import Todo from '../models/todo.js'
import Class from '../models/class.js'

const router =  express.Router();

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

const saveTodo = (todoitem, res) => {
    console.log("savetodo", todoitem)
    const name = todoitem.username
    Todo.countDocuments({username: name}, (err, count) => {
        if (count){ 
            Todo.deleteOne({ username: name },()=>{}) 
            console.log("delete todo")
        }
        const todo = new Todo(todoitem);
        todo.save((err) => {
            if(err){console.log(err)}
            else{
                console.log("save todo")
                const data = { msg: `${name}'s todo saved!!!`}
                res.status(200).send(data)
            }
        });
    });
};

const saveClass = (classlist, res) => {
    Class.deleteOne({},(err,res)=>{
        if(err){ console.log(err) }
        console.log("delete ",res.deletedCount," class")
    })
    const newclasslist = new Class({classlist:classlist})
    console.log(newclasslist)
    newclasslist.save((err) => {
        if(err){console.log(err)}
        else{
            console.log("save class")
            const data = { msg: `new class list saved`}
            res.status(200).send(data)
        }
    });
    
};

router.post("/saveClass", (req, res)=>{
    if(res){
        var classlist = req.body
        saveClass(classlist, res)
    }else{
        const data = { msg: 'Fail to save class' }
        res.status(403).send(data)  
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