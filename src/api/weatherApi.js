import axios from 'axios';
import { useState } from 'react';


const baseUrl = 'http://api.openweathermap.org/data/2.5';
const API_KEY = "524589f12ff60e2a150e470595208862";


export const getWeatherForecastData =  (city) => {
    let weatherUrl =  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    let forecastUrl =  axios.get( `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
    axios
    .all([weatherUrl, forecastUrl])
    .then(
      axios.spread((...responses) => {
        const data = {weatherResponse: responses[0], forecastResponse: responses[1]};
         console.log('data',data);
      })
    )
    .catch(errors => {
      // react on errors.
      console.error(errors);
    });
  
}