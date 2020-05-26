import React from 'react';
import PropTypes from 'prop-types';

function Result(props) {
  return (
      <div className="container result">
        <strong>{props.quizResult} y tu puntaje es de: {props.quizPoints}</strong>
      </div>
  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired
};

export default Result;
