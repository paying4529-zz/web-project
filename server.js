import bodyParser from "body-parser"
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv-defaults'

import User from './models/user.js'
import express from 'express'
// import pkg_yoga from 'graphql-yoga'
// const {PubSub} = pkg_yoga
import pkg_express from 'express-graphql'
const {graphqlHTTP} = pkg_express

import path from "path"
const __dirname = path.resolve();

import Root from './resolvers/root.js'
import schema from './schema.graphql.js'
import Todo from "./models/todo.js"
import Date from "./models/date.js"
import Calendar from "./models/calendar.js"
import Class from "./models/class.js"

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

const port = process.env.PORT || 4000

db.once('open', () => {
    // be careful not to listen twice
    // const pubsub = new PubSub()
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: Root,
        context: { // pass by args
            User: User,
            Todo: Todo,
            Date: Date,
            Calendar: Calendar,
            Class: Class,
            // Pubsub: pubsub
        },
        graphiql: true,
    }));
    app.use(express.static("build"));
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
    app.listen(port, () =>
        console.log(`Example app listening on port ${port}!`)
    )
});