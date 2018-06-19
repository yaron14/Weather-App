import React, { Component } from "react";
import Home from "./Home";
import { Link } from "react-router-dom";

export default class WeatherSearch extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      weatherLoc: ""
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ weatherLoc: e.target.elements.search.value });
  }
  render() {
    return (
      <div>
        <Link to="/">Back Home</Link>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="search" placeholder="enter a city" />
          <button type="submit">Search!</button>
        </form>
        {this.state.weatherLoc && <Home city={this.state.weatherLoc} />}
      </div>
    );
  }
}
