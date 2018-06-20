import React from "react";
import { Link } from "react-router-dom";

export default props => {
  const getDayWeather = props.location.state.data.filter(date => date.datetime.split(":")[0] === props.match.params.date);
  console.log(props);
  return (
    <div>
      <div>
        <Link to="/">Back Home</Link>
      </div>
      <h2>
        Hourly Weather Forecast in {props.location.state.city_name}, {props.location.state.country_code} on {props.match.params.date}
      </h2>
      {getDayWeather.map((hourWeather, i) => (
        <div key={i}>
          <div>
            <img src={`https://www.weatherbit.io/static/img/icons/${hourWeather.weather.icon}.png`} alt="_weather" style={{ width: "40px" }} />
          </div>
          <span>{hourWeather.timestamp_local.split("T")[1]}: </span>
          <span>Temp: {hourWeather.temp} </span>
        </div>
      ))}
    </div>
  );
};
