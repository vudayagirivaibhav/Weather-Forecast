import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BASE_URL, API_KEY} from '../../config';

const WeatherPage = () => {
    const [city, setCity] = useState("San jose");
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    const getWeatherInfo = async () => {
        setLoading(true);
       let weatherUrl =  await axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}`);
       let forecastUrl = await  axios.get( `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}`);
       axios
       .all([weatherUrl, forecastUrl])
       .then(
         axios.spread((...responses) => {
           let weatherResponse =  responses[0].data;
            let  forecastResponse = responses[1].data.list;
           setWeatherData(weatherResponse);
           setForecastData(forecastResponse);
           setLoading(false);
         })
       )
       .catch(errors => {
        setLoading(false);
         // react on errors.
         console.error(errors);
       });
    }
    
    useEffect(()=> {
        getWeatherInfo();
    },[]);

    return (
        <div>
            <div className="weather-div">
                <input type="text" placeholder="Enter City name(ex: Dallas,San jose)" onChange={(e) => setCity(e.target.value)} />
                <button type="button"  onClick={() => getWeatherInfo()}> Forecast </button>
            </div>
         {
             loading ? <h1>Loading data</h1>:
            weatherData? <div className="result-container">
                 <div className="info-container">
                 <h3>Current Weather Info</h3>
                 <h4 className="city-name">{weatherData.name}</h4>
                 <p className="description">{weatherData.weather[0].description}</p>
                 <div className="description">
                     <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}/>
                 </div>
                 <div className="forecast-container">
                 <h4>Forecast chart</h4>
            </div>
            </div>
                </div>:null
         }   
           
        </div>

    )
}

export default WeatherPage;