import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { client } from '../index';
import "./styles/Weather.css";
import Description from './Description';

function Weather(props) {
    const [zip, setZip] = useState('');
    const [weather, setWeather] = useState('');
    const [unit, setUnit] = useState('imperial');

    async function getWeather() {
        try {
          debugger;
          const json = await client.query({
            query: gql`
              query {
                getWeather(zip: ${zip}, unit: ${unit}) {
                  location
                  temperature
                  description
                  feelsLike
                  tempMin
                  tempMax
                  status
                }
              }`
          })
          setWeather(json)
        } catch(err) {
          console.log(err.message)
        }
      }

    return (
        <div className="weather">
            <form onSubmit={(e) => {
                e.preventDefault();
                getWeather();
            }}>
                <input className="text-box"
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  pattern="(\d{5}([\-]\d{4})?)"
                  placeholder="Enter Zip Code"
                />
                <button type="submit">Submit</button>

                <div className="radio-button">
                    <input
                      type="radio"
                      value="imperial"
                      name="Fahrenheit"
                      checked={ unit === "imperial" ? true : false }
                      onChange={(e) => setUnit(e.target.value)}
                    />
                    <label htmlFor="F">Fahrenheit</label>
                    <input
                      id="F"
                      type="radio"
                      value="metric"
                      name="Fahrenheit"
                      checked={ unit === "metric" ? true : false }
                      onChange={(e) => setUnit(e.target.value)}
                    />
                    <label htmlFor="C">Celsius</label>
                    <input
                      id="C"
                      type="radio"
                      value="default"
                      name="Celsius"
                      checked={ unit === "default" ? true : false }
                      onChange={(e) => setUnit(e.target.value)}
                    />
                    <label htmlFor="K">Kelvin</label>
                    <input
                      id="K"
                      type="radio"
                      value="standard"
                      name="Kelvin"
                      checked={ unit === "default" ? true : false }
                      onChange={(e) => setUnit(e.target.value)}
                    />
                </div>
            </form>
            { weather ? <Description data={weather.data.getWeather} unit={unit} /> : null }
        </div>
    );
}

export default Weather;