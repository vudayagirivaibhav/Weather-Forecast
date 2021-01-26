import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../config';
import ForecastWeather from './ForecastWeather';

const WeatherPage = () => {
    const [city, setCity] = useState("San jose");
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    //fetch weather info and forecast info
    const getWeatherInfo = async () => {
        setLoading(true);
        let weatherUrl = await axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=imperial`);
        let forecastUrl = await axios.get(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=imperial`);
        axios
            .all([weatherUrl, forecastUrl])
            .then(
                axios.spread((...responses) => {
                    console.log(responses);
                    let weatherResponse = responses[0].data;
                    let forecastResponse = responses[1].data.list;
                    console.log(forecastResponse);
                    setWeatherData(weatherResponse);
                    setForecastData(forecastResponse);
                    setLoading(false);
                })
            )
            .catch(error => {
                setLoading(false);
                // react on errors.
                console.log('error', error);
                setError(error);
            });
    }

    //At the time of rendering 
    useEffect(()=> {
        getWeatherInfo();
    },[]);
   
    return ( 
        <div>
            <div className="weather-div">
                <input type="text" placeholder="Enter City name(ex: Dallas,Austin)" onChange={(e) => setCity(e.target.value)} />
                <button type="button" onClick={() => getWeatherInfo()}> Forecast </button>
            </div>
            {
                loading ? <h1>Loading data</h1> :
                    weatherData ? <div className="result-container">
                        <div className="info-container">
                            <h3>Current Weather Info</h3>
                            <h4 className="city-name">{weatherData.name}</h4>
                            <p className="description">{weatherData.weather[0].description}</p>
                            <div className="description">
                                <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} />
                            </div>
                            
                            <div className="forecast-container">
                                <ForecastWeather data={forecastData}></ForecastWeather>
                            </div>
                        </div>
                    </div> : null
            }

        </div>

    )
}

export default WeatherPage;