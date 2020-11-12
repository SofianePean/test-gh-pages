import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function Game({ name, box, id }) {
  return (
    <div className="card">
      <img src={box} alt="jeu profil pic" className="card-img" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <Link to={{
          pathname: `game/${name}`,
          state: {
            gameID: id,
          },
        }}
        >
          <div className="card-btn">Regarder {name}</div>
        </Link>
      </div>
    </div>
  );
}

Game.propTypes = {
  id: PropTypes.number.isRequired,
  box: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Game;
