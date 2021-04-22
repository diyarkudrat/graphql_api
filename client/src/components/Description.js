import React, { useState } from 'react';
import './styles/Description.css';

function Description(props) {
    const [units, setUnits] = useState(props.unit);
    const { location, temperature, description, feelsLike, tempMin, tempMax, status } = props.data;

    if (status === 200) {
        return (
            <div className="weather-description">
                <table>
                  <tr>
                    <th colSpan="2">
                        <h2>{ location }</h2>
                    </th>
                  </tr>
                  <tr>
                      <td>Description: </td>
                      <td>{ description }</td>
                  </tr>
                  <tr>
                      <td>Temp: </td>
                      <td>{ temperature }° { units }</td>
                  </tr>
                  <tr>
                      <td>Feels Like: </td>
                      <td>{ feelsLike }° { units }</td>
                  </tr>
                  <tr>
                      <td>High: </td>
                      <td>{ tempMax }° { units }</td>
                  </tr>
                  <tr>
                      <td>Low: </td>
                      <td>{ tempMin }° { units }</td>
                  </tr>
                </table>
            </div>
        );
    } else {
        return <div className="data-error"> Error: {status}</div>
    }
}

export default Description;