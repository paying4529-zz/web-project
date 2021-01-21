import bodyParser from "body-parser"
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv-defaults'
import pkg from 'http-proxy-middleware';
const {createProxyMiddleware} = pkg;
import express from 'express'
import http from 'http'

import path from "path"
const __dirname = path.resolve();

import SERVER from './schema.js'

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
const URI = "http://localhost:4000"
const apiProxy = createProxyMiddleware('/graphql', {target:URI});
const wsProxy = createProxyMiddleware('/graphql', {ws:true, target:URI});

db.once('open', () => {
    // be careful not to listen twice
    app.use(apiProxy);
    app.use(wsProxy);
    app.use(express.static("public")); // *****
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html')); // *****
    });
    
    SERVER.applyMiddleware({
        app: app
    })
    const httpServer = http.createServer(app);
    SERVER.installSubscriptionHandlers(httpServer);
    httpServer.listen(port, () => {
        console.log(`The server has started on port ${port}`)
    })
});