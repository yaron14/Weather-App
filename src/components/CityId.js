import React from 'react';
import Home from './Home';
import { Link } from 'react-router-dom';

const CityId =  (props) => {
  console.log(props);
  return (
    <div>
      <Link to="/">Back Home</Link>
      <Home city={props.match.params.id} />
    </div>
  )
}

export default CityId;