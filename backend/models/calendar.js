import mongoose from 'mongoose'

const Schema = mongoose.Schema
const CalendarSchema = new Schema({
    username: { type: String, required: true,},
    year: {type: Number, required: true},
    month: {type: Number, required: true},
    todolist: [Schema.Types.Mixed]
});
const Calendar = mongoose.model('Calendar', CalendarSchema);
export default Calendar;