import TransactionModal from '../TransactionModal';
import Enzyme from 'enzyme';
import { cleanup, render } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
Enzyme.configure({ adapter: new Adapter() });

describe('<Transactions>', () => {
   afterEach(cleanup);
   const client = new ApolloClient({
      uri: 'http://localhost:5000/graphql',
      cache: new InMemoryCache(),
   });
   const handleClose = () => {};
   const openModal = true;
   const hash = '';

   it('renders Transactions Component', () => {
      render(
         <ApolloProvider client={client}>
            <TransactionModal
               handleClose={handleClose}
               openModal={openModal}
               hash={hash}
            />
         </ApolloProvider>
      );
   });
});
