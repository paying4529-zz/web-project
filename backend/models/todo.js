import mongoose from 'mongoose'

const Schema = mongoose.Schema
const TodoSchema = new Schema({
    username: { type: String, required: true, unique: true },
    userclass: { type: String,required: true},
    todolist: [Schema.Types.Mixed],
});
const Todo = mongoose.model('Todo', TodoSchema);
export default Todo;