import React from "react";
import Home from "../components/Home";
import WeatherSearch from "../components/WeatherSearch";
import NoMatch from "../components/NoMatch";
import CityId from "../components/CityId";
import Hourly from "../components/Hourly";
// import HeadersLinks from './HeadersLinks';
import { BrowserRouter, Route, Switch } from "react-router-dom";

const AppRoters = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/search" component={WeatherSearch} exact />
          <Route path="/search/:id" component={CityId} />
          <Route path="/hourly/:date" component={Hourly} />
          <Route component={NoMatch} />
        </Switch>
        {/* <Route path="/:id" component={WeatherSearch} /> */}
      </div>
    </BrowserRouter>
  );
};

export default AppRoters;
