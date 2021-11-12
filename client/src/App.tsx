import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Transactions from './components/Transactions/Transactions';

const client = new ApolloClient({
   uri: '/api/graphql',
   cache: new InMemoryCache(),
});

const App = () => (
   <ApolloProvider client={client}>
      <Router>
         <Route path="/" exact component={Transactions} />
      </Router>
   </ApolloProvider>
);
export default App;
