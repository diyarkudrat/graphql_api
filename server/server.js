const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fetch = require('node-fetch');

require('dotenv').config();


// GraphQL Schemas
const schema = buildSchema(`
enum Unit {
    standard
    metric
    imperial
}

type Weather {
    location: String
    temperature: Float
    description: String
    feelsLike: Float
    tempMin: Float
    tempMax: Float
    status: Int
    message: String
}

type Query {
    getWeather(zip: Int!, unit: Unit): Weather
}
`)

// Resolvers
const root = {
    getWeather: async ({ zip, unit }) => {
        const units = { standard: '', metric: 'metric', imperial: 'imperial' };

        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=${units[unit]}`;

        const res = await fetch(url);
        const json = await res.json();
        console.log('DATA', json);

        const status = parseInt(json.cod);

        if (status != 200) {
            return { status, message: json.message }
        } else {
            const location = json.name;
            const temperature = json.main.temp;
            const description = json.weather[0].description;
            const feelsLike = json.main.feels_like;
            const tempMin = json.main.temp_min;
            const tempMax = json.main.temp_max;
            
            return { 
                location,
                temperature,
                description,
                feelsLike,
                tempMin,
                tempMax,
                status
            }
        }

    }
}

const cors = require('cors');
const app = express();

app.use(cors());

// Routes
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Running on localhost:${port}`);
})