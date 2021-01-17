import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ClassSchema = new Schema({
    label: { type: String},
    value: { type: String},
});
const ClasslistSchema = new Schema({
    classlist: [ClassSchema],
});

const Class = mongoose.model('Class', ClasslistSchema);
export default Class;