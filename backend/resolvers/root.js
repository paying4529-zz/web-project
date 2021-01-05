const Root = {
    // resolvers specified on parent itself, in this case, their prototype is (args, context, info) and you can access parent using this
    // query
    getUsers: async (args, {User}, info) => {
        // for home page, return all users (username, password, userclass)
        console.log("query user")
        return await User.find()
    },

    getTodos: async (args, {User,Todo}, info) => {
        console.log("query todo")
        const {username} = args.query
        const userinfo = await User.find({"username": username})
        const userclass = userinfo[0].userclass
        if(userclass==="general director"){
            const data = await Todo.find({$or: [{"username": username},{userclass:"section manager"},{userclass:"group member"}]})
            return data
        }else if(userclass==="section manager"){
            const data = await Todo.find({$or: [{"username": username},{userclass:"group member"}]})
            return data
        }else if(userclass==="group member"){
            const data = await Todo.find({$or: [{"username": username}]})
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
            return {
                success: false
            }
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
                success: true
            }
        }
    }

}
export default Root