import React from 'react';
import { Link } from 'react-router-dom';

function GameStreams({thumbnail_url, user_name, viewer_count, login }) {
  return (
    <div className="card-game-streams">
      <img src={thumbnail_url} alt="jeu carte image" className="card-game-streams-img"/>
      <div className="card-game-streams-body">
        <h5 className="card-game-streams-title">{user_name}</h5>
        <p className="card-game-streams-text">Nombre de viewers : {viewer_count}</p>
        <Link
        className="link"
        to={{
          pathname: `/live/${login}`
        }}
        >
          <div className="card-game-streams-btn">Regarder {user_name}</div>
        </Link>
      </div>
    </div>
  )
}

export default GameStreams;
