This web application is a simple application to list block chain transactions.

## Infrastructure

This applications consists of two parts:
  1. Frontend: Single Page Application built with: React and Material.Apollo Client(React) is used as the GraphQL client. Alternatively, React Query (supports both REST and GraphQL) can be used. Both of these library supports React hooks based APIs, caching, polling, parallel queries, pagination,
  2. Backend: The API is implemented in GraphQL using Apollo Server, Express and Postgres. The resolvers uses blockchain.info's REST API to get the blocks data.The resolvers uses blockchain.info's REST API to get the blocks data.

## How to run

to start the application use docker compose:

`docker-compose up --build`

once the index is running you can open:

http://localhost:3050

on your browser.

## Design 
 - Using material UI , react-bootstrap and bootstrap to easily build UI components.
 - usage of tsdoc to implement code documentation
 
## Data Access Layer.
 - Usage of redux or context-api to manage state data



## How to test
 `npm run test`
 - A clean architecture for separation of concerns to easily test functionality, business logic from UI logic
 - frontend testing with react-testing-library and jest
 - backend  testing with jest
 - Usage of katalon studio / selenium for UI test automation

## Deployment / Host
 - setting docker
 - setting up nginx to serve our application
 - deploy to aws with kubernetes to easily scale the application
 
