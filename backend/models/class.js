import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ClassSchema = new Schema({
    group: { type: String},
    classname: { type: String},
});
const Class = mongoose.model('Class', ClassSchema);
export default Class;