import mongoose from 'mongoose'

const Schema = mongoose.Schema
const DateSchema = new Schema({
    enddate: { type: String, required: true }
});
const Date = mongoose.model('Date', DateSchema);
export default Date;