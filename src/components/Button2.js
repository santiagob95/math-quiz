
import React from 'react';

const Button2 = ({ onClick, children, id }) => {
  return (
    <button className="button2"  onClick={onClick} id={id}>
      {children}
    </button>
  );
};

export default Button2;