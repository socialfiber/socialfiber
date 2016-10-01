import React from 'react';

const Friend = (props) => {
  return (
    <div>
      <img src={props.img}></img>
      <a href={props.url}>username w/ url</a>
    </div>
  );
}

export default Friend;
