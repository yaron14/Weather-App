import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import WeatherSearch from "../components/WeatherSearch";
import NoMatch from "../components/NoMatch";
import CityId from "../components/CityId";
import Hourly from "../components/Hourly";
// import HeadersLinks from './HeadersLinks';

const AppRoters = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/search" component={WeatherSearch} exact />
          <Route path="/search/:id" component={CityId} />
          <Route path="/hourly/:date" component={Hourly} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRoters;
