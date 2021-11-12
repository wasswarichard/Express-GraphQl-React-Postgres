import React from 'react';
import Transactions from '../Transactions';
import Enzyme from 'enzyme';
import { cleanup, render } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from 'react-test-renderer';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
Enzyme.configure({ adapter: new Adapter() });

describe('<Transactions>', () => {
   afterEach(cleanup);
   const client = new ApolloClient({
      uri: 'http://localhost:5000/graphql',
      cache: new InMemoryCache(),
   });

   it('renders Transactions Component', () => {
      render(
         <ApolloProvider client={client}>
            <Transactions />
         </ApolloProvider>
      );
   });

   it('should match snapshot', function () {
      const tree = TestRenderer.create(
         <ApolloProvider client={client}>
            <Transactions />
         </ApolloProvider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
   });
});
