import mongoose from 'mongoose'

const Schema = mongoose.Schema
const SheetColSchema = new Schema({
    value: { type: String},
    readOnly: { type: Boolean},
    width: { type: Number},
    colSpan: { type: Number},
    className: { type: String},
});
const sheetSchema = new Schema({
    sheet: [[SheetColSchema]],
});

const Sheet = mongoose.model('Sheet', sheetSchema);
export default Sheet;