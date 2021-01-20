// for graphqlExpress
import pkg2 from 'apollo-server-express'
const { ApolloServer, gql } = pkg2
import pkg_sub from 'graphql-subscriptions';
const { PubSub } = pkg_sub

import User from './models/user.js'
import Todo from "./models/todo.js"
import Date from "./models/date.js"
import Calendar from "./models/calendar.js"
import Class from "./models/class.js"

import TYPEDEFS from "./types.js"
import RESOLVERS from "./resolvers/resolvers.js"

const port = process.env.PORT || 4000
const subscriptionsEndpoint = `ws://localhost:${port}/graphql`;
const pubsub = new PubSub()

const SERVER = new ApolloServer({
    typeDefs: TYPEDEFS,
    resolvers: RESOLVERS,
    context: {
        User: User,
        Todo: Todo,
        Date: Date,
        Calendar: Calendar,
        Class: Class,
        Pubsub: pubsub
    },
    playground: {
        endpoint: `http://localhost:4000/graphql`,
    },
    subscriptions: {
        onConnect: () => console.log('Connected to websocket'),
    },
    subscriptionsEndpoint: subscriptionsEndpoint
})

export default SERVER