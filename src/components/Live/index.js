import React, { useState, useEffect } from 'react';
import ReactTwitchEmbebVideo from 'react-twitch-embed-video';
import { useParams } from 'react-router-dom';
import api from '../../api';
import './live.scss';

function Live() {
  const [infoStream, setInfoStream] = useState([]);
  const [infoGame, setInfoGame] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(`https://api.twitch.tv/helix/streams?user_login=${slug}`);
      const gameID = result.data.data.map((gameID) => gameID.game_id);
      const resultNameGame = await api.get(`https://api.twitch.tv/helix/games?id=${gameID}`);
      const nameGame = resultNameGame.data.data.map((gameName) => gameName.name);
      setInfoGame(nameGame);
      setInfoStream(result.data.data[0]);
    };
    fetchData();
  }, []);
  console.log(slug);
  return (
    <div className="container-live">
      <ReactTwitchEmbebVideo height="754" width="100%" channel={slug} />
      <div className="container-info">
        <div className="container-info-title">{infoStream.title}</div>
        <div className="container-info-viewer">Viewers : {infoStream.viewer_count}</div>
        <div className="container-info-game">Streamer : {infoStream.user_name}, &nbsp; Langue : {infoStream.language}</div>
        <div className="container-info-name">Jeu : {infoGame}</div>
      </div>
    </div>
  );
}

export default Live;
