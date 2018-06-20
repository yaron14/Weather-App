import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {},
      daily: {},
      hourly: {}
    };
  }
  componentWillMount(value = this.props.city) {
    if (!this.props.city) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.fetchData({
          info: `lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
        });
      });
    } else {
      this.fetchData({
        info: `city=${value}`
      });
    }
  }
  fetchData({ info } = {}) {
    Promise.all(
      [
        fetch(`https://api.weatherbit.io/v2.0/current?${info}&key=171524f097eb4182a7a0ed68dbe0f01f`).then(res =>
          res.json().then(current =>
            this.setState({
              current
            })
          )
        )
      ],
      [
        fetch(`https://api.weatherbit.io/v2.0/forecast/daily?${info}&days=5&key=171524f097eb4182a7a0ed68dbe0f01f`).then(res =>
          res.json().then(daily =>
            this.setState({
              daily
            })
          )
        )
      ],
      [
        fetch(`https://api.weatherbit.io/v2.0/forecast/3hourly?${info}&key=171524f097eb4182a7a0ed68dbe0f01f`).then(res =>
          res.json().then(hourly =>
            this.setState({
              hourly
            })
          )
        )
      ]
    ).catch(err => console.log(err) && <div>ERROR...</div>);
  }
  render() {
    if (Object.keys(this.state.daily).length === 0 || Object.keys(this.state.current).length === 0) {
      return <div>LOADING...</div>;
    }
    console.log(this.state);
    return (
      <div>
        {!this.props.city && <Link to="/search">Search for location</Link>}
        <h3>
          Weather and forecasts in {this.state.current.data[0].city_name}, {this.state.current.data[0].country_code}{" "}
        </h3>
        <div>
          <h4>Current Temp: {Math.floor(this.state.current.data[0].temp)}</h4>
        </div>
        <div style={{ display: "flex" }}>
          {this.state.daily.data.map((data, i) => (
            <div key={i}>
              <div>
                <Link
                  to={{
                    pathname: `/hourly/${data.datetime}`,
                    state: this.state.hourly
                  }}
                >
                  <img src={`https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`} alt="_weather" />
                </Link>
              </div>
              <div>
                <span>
                  <strong>Weather on</strong> {data.datetime}:{" "}
                </span>
                <span className="hourly-weather">{data.temp} </span>
                <span>{data.weather.description} </span>
                <span>
                  <strong>Min Temp:</strong> {data.min_temp}{" "}
                </span>
                <span>
                  <strong>Max Temp:</strong> {data.max_temp}{" "}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
