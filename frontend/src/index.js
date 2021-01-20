import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import { ApolloClient, InMemoryCache } from 'apollo-boost'
import {ApolloProvider} from '@apollo/client' // fixed invariant error
// import { split } from 'apollo-link'
// import { HttpLink } from 'apollo-link-http'
// import { WebSocketLink } from 'apollo-link-ws'
// import { getMainDefinition } from 'apollo-utilities'

import { SubscriptionClient } from 'subscriptions-transport-ws'
import { fetch } from 'node-fetch'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import ws from 'ws'
import  { InMemoryCache } from 'apollo-cache-inmemory'

const wsclient = new SubscriptionClient('ws://localhost:4000/subscriptions', {
  reconnect: true,
}, ws);

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:4000/graphql', fetch }),
  cache: new InMemoryCache(),
  networkInterface: wsclient,
});

/*
// Create an http link:
const httpLink = new HttpLink({
  uri: '/graphql'
})
// // Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: { reconnect: true }
})
// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
// Apollo Client should use your WebSocketLink for subscriptions, but http link for queries or mutations
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache().restore({})
})
*/

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
