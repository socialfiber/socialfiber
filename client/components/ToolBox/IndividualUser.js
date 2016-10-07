import React from 'react';
import { Link } from 'react-router';


const IndividualUser = (props) => {
  return (
    <div className="username-div">
      <img src={props.img}></img>
      <Link className="all-users-name" to={`/browseprofile/${props.otherID}`}>{props.username}</Link>
    </div>
  );
}

export default IndividualUser;
