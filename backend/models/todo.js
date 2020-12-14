import mongoose from 'mongoose'

const Schema = mongoose.Schema
const TodoSchema = new Schema({
    username: { type: String, required: true, unique: true },
    itemslist: [Schema.Types.Mixed],
});
const Todo = mongoose.model('Todo', TodoSchema);
export default Todo;