import React from 'react';
import { Link } from 'react-router';

const Friend = (props) => {
  return (
    <div>
      <img src={props.img}></img>
      <Link to={`/browseprofile/${props.otherID}`}>USERNAME GOES HERE{props.username}</Link>
      <a href={props.url}>username w/ url</a>
    </div>
  );
}

export default Friend;
