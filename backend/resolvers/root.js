const Root = {
    // resolvers specified on parent itself, in this case, their prototype is (args, context, info) and you can access parent using this
    // query
    getUsers: async (args, {User}, info) => {
        // for home page, return all users (username, password, userclass)
        console.log("query")
        return await User.find()
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