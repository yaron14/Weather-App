import React from "react";
import { Link } from "react-router-dom";

export default props => {
  const getDayWeather = props.location.state.data.filter(date => date.datetime.split(":")[0] === props.match.params.date);
  console.log(getDayWeather);
  return (
    <div>
      <div>
        <Link to="/">Back Home</Link>
      </div>
      <h2>Hourly Weather Forecast for {props.match.params.date}</h2>
      {getDayWeather.map((hourWeather, i) => (
        <div key={i}>
          <span>{hourWeather.timestamp_local}: </span>
          <span>Temp: {hourWeather.temp} </span>
          <img src={`https://www.weatherbit.io/static/img/icons/${hourWeather.weather.icon}.png`} alt="_weather" />
        </div>
      ))}
    </div>
  );
};
