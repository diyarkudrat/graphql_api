const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
require('dotenv').config();

// API Key
const apiKey = process.env.OPENWEATHERMAP_API_KEY;

// GraphQL Schemas
const schema = buildSchema(`
type Test {
    message: String!
}

type Weather {
    temperature: Float!
    description: String!
}

type Query {
    getWeather(zip: Int!): Weather!
}
`)

// Resolvers
const root = {

}

const app = express();

// Routes
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))

const port = 4000;
app.listen(port, () => {
    console.log(`Running on localhost:${port}`);
})