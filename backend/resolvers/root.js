const Root = {
    // resolvers specified on parent itself, in this case, their prototype is (args, context, info) and you can access parent using this
    // query
    getUsers: async (args, {User}, info) => {
        // for home page, return all users (username, password, userclass)
        console.log("query, getUsers")
        return await User.find()
    },
    getSubusers: async ({username}, {User}, info) => {
        console.log("query, getSubuser")
        const result = await User.find({"username": username})
        const userClass = result[0].userclass
        if(userClass==="general director"){
            const userList = await User.find({$or:[{username:username},{userclass:"section manager"},{userclass:"group member"}]}).limit(100)
            console.log("subuser:",userList)
            return userList
        }
        else if(userClass==="section manager"){
            const userList = await User.find({$or:[{username:username},{userclass:"group member"}]}).limit(100)
            console.log("subuser:",userList)
            return userList
        }
        else if(userClass==="group member"){
            return result
        }
    },
    getOneUser: async ({username}, {User}, info) => {
        // for login, return user if username found, and whether success
        console.log("query, getOneUser")
        console.log("username", username)
        const user = await User.find({"username": username})
        console.log("user", user)
        if (user.length > 0) {
            return {
                user: user[0],
                success: true
            }
        }
        else return { success: false }  

    },
    getTodos: async ({username}, {User,Todo}, info) => {
        console.log("query todo", username)
        const userinfo = await User.find({"username": username})
        const userclass = userinfo[0].userclass
        if(userclass==="general director"){
            const data = await Todo.find({$or: [{"username": username},{userclass:"section manager"},{userclass:"group member"}]})            
            console.log(username, "query, data:", data)
            // console.log(data[0].username, data[0].todolist[0])
            // console.log(data[1].username, data[1].todolist[0])
            return data
        }else if(userclass==="section manager"){
            const data = await Todo.find({$or: [{"username": username},{userclass:"group member"}]})
            console.log(username, "query, data:", data)
            // console.log(data[0].username, data[0].todolist[0])
            // console.log(data[1].username, data[1].todolist[0])
            return data    
        }else if(userclass==="group member"){
            const data = await Todo.find({$or: [{"username": username}]})
            console.log(username, "query, data:", data)
            return data   
        }

    },

    // mutation
    addUser: async (args, {User}, info) => {
        // for register, add new user to db if username doesn't exist
        console.log("mutation")
        const {username, password, userclass} = args.data
        const data = await User.find({"username": username})
        if (data.length > 0){
            return { success: false }
        }
        else{
            const newUser = new User({
                    username: username,
                    password: password,
                    userclass: userclass
            })
            const error = await newUser.save()
            return {
                user: newUser,
                success: true }
        }
    }

}
export default Root