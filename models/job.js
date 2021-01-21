import mongoose from 'mongoose'

const Schema = mongoose.Schema
const JobSchema = new Schema({
    value: { type: String},
    readOnly: { type: Boolean},
    width: { type: Number},
    colSpan: { type: Number},
    rowSpan: { type: Number},
    className: { type: String},
});
const JoblistSchema = new Schema({
    joblist: [[JobSchema]],
});

const Job = mongoose.model('Job', JoblistSchema);
export default Job;