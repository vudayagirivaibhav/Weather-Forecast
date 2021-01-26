import React from 'react';
import moment from 'moment';
import {DAYS} from '../constants';


const ForecastWeather = (forecastData) => {

  //Since, the forecast api is returning wether data every 3 hours, refractoring the 40 array count to 5 days
  let data = forecastData.data.filter((element, index) => {
    return index % 8 === 0;
  });
   
  return (
    <div>
      <div className="days-forecast">
        <h3>Forecast Weather for 1 week </h3>
        <ul className="weeks">
          {data.slice(0, 6).map(({ dt, weather, main }, index) => {
            console.log(dt);
            const day = new Date(dt * 1000);
            console.log(day);
            return (<li className="week" key={dt}>
              <a>
                <p>{DAYS[day.getDay()]}</p>
                <div><img src={`http://openweathermap.org/img/w/${weather[0].icon}.png`} /></div>
                <p>{weather[0].description}</p>
                <div className="temp-text">
                  <span>Max temp: {Math.round(main.temp_max)}&deg;</span> <br/>
                  <span>Min temp:{Math.round(main.temp_min)}&deg;</span>
                  </div>
              </a>
            </li>)
          })}               
           </ul>
      </div>
    </div>
  )
}

export default ForecastWeather;