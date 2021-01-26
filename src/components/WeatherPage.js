import React, { useState, useEffect } from 'react';
import {getWeatherForecastData} from '../api/weatherApi';

const WeatherPage = () => {
    const [city, setCity] = useState("San jose");
    const [weatherData, setWeatherData] = useState(null);
    const [loading,setLoading] = useState(false);

    const getWeatherInfo = async () => {
       try {
           const data = await getWeatherForecastData(city);
           console.log('data',data);
       }catch(error){
           console.log(error.message);
       }
    }
      
    return (
        <div>
            <div className="weather-div">
                <input type="text" placeholder="Enter City name(ex: Dallas,San jose)" onChange={(e) => setCity(e.target.value)} />
                <button type="button"  onClick={() => getWeatherInfo()}> Forecast </button>
            </div>
            <div className="info-container">
                 <h4>Live Weather Info</h4>
            </div>
            <div className="forecast-container">
                 <h4>Forecast chart</h4>
            </div>
        </div>

    )
}

export default WeatherPage;