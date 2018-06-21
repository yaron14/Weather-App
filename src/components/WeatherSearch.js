import React, { Component } from "react";
import Home from "./Home";
import { Link } from "react-router-dom";
import Autosuggest from "react-autosuggest";

let locations = [];

const fetchData = city => {
  fetch(
    `https://cors-anywhere.herokuapp.com/` +
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&types=(cities)&key=AIzaSyB6PImxZ0np3HHq4RmOYQUP0utcPXbibaU`
  ).then(response =>
    response
      .json()
      .then(
        data =>
          (locations = data.predictions.map((loc, i) => {
            return {
              index: i,
              name: loc.description
            };
          }))
      )
      .catch(err => console.log(err))
      .finally(e => ({
        name: "ERROR"
      }))
  );
};

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : locations.filter(loc => loc.name.toLowerCase().slice(0, inputLength) === inputValue);
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

export default class WeatherSearch extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: [],
      isLoading: false,
      dispatch: ""
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      isLoading: true,
      value: newValue
    });
  };

  onSuggestionsFetchRequested = async ({ value, reason }) => {
    await fetchData(value);
    this.setState({
      dispatch: reason === "suggestion-selected" && "dispatch",
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      isLoading: false,
      suggestions: []
    });
  };

  render() {
    const { value, suggestions, isLoading, dispatch } = this.state;
    const inputProps = {
      placeholder: "Search for location...",
      value,
      onChange: this.onChange
    };
    const status = isLoading ? "Loading..." : "Type to load suggestions";
    return (
      <div>
        <Link to="/">Back Home</Link>
        <div className="status">
          <strong>Status:</strong> {status}
        </div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          alwaysRenderSuggestions={true}
          inputProps={inputProps}
        />
        {dispatch && <Home city={value} />}
      </div>
    );
  }
}
