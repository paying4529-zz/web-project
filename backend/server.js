import express from 'express'
import bodyParser from "body-parser"
import cors from 'cors'
import homeRouter from './routes/home.js'
import usersRouter from './routes/users.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv-defaults'

dotenv.config();
if (!process.env.MONGO_URL) {
    console.error('Missing MONGO_URL!!!')
    process.exit(1)
}
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(process.env.MONGO_URL, dbOptions)
    .then(res => {
        console.log('mongo db connection created')
})
const db = mongoose.connection;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/', homeRouter);
app.use('/users', usersRouter);

const port = process.env.PORT || 4000

db.once('open', () => {
    // be careful not to listen twice
    app.listen(port, () =>
        console.log(`Example app listening on port ${port}!`)
    )
});