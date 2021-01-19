import express from "express"
import Class from '../models/class.js'

const router =  express.Router();


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

// router.post("/saveClass", (req, res)=>{
//     if(res){
//         var classlist = req.body
//         saveClass(classlist, res)
//     }else{
//         const data = { msg: 'Fail to save class' }
//         res.status(403).send(data)  
//     }
// })


export default router