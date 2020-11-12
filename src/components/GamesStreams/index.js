import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import GameStream from './GameStreams';
import api from '../../api';
import './gamesStreams.scss';

function GamesStreams() {
  const [streamData, setStreamData] = useState([]);
  const [viewers, setViewers] = useState([]);
  const location = useLocation();
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(`https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}`);
      const dataArray = result.data.data;
      let finalArray = dataArray.map((stream) => {
        const newURL = stream.thumbnail_url
          .replace('{width}', '320')
          .replace('{height}', '180');
        stream.thumbnail_url = newURL;
        return stream;
      });
      const totalViewers = finalArray.reduce((acc, val) => acc + val.viewer_count, 0);
      const userIDs = dataArray.map((stream) => stream.user_id);
      const baseUrl = 'https://api.twitch.tv/helix/users?';
      let queryParamsUsers = '';
      userIDs.map((id) => {
        (queryParamsUsers += `id=${id}&`);
      });
      const finalUrl = baseUrl + queryParamsUsers;
      const getUsersLogin = await api.get(finalUrl);
      const userLoginArray = getUsersLogin.data.data;
      finalArray = dataArray.map((stream) => {
        stream.login = '';
        userLoginArray.forEach((login) => {
          if (stream.user_id === login.id) {
            stream.login = login.login;
          }
        });
        return stream;
      });
      setViewers(totalViewers);
      setStreamData(finalArray);
    };
    fetchData();
  }, []);
  console.log(viewers);
  console.log(streamData);

  return (
    <div className="games-streams">
      <h1 className="games-streams-title">Streams: {slug}</h1>
      <h3 className="games-streams-subtitle">
        <strong className="games-streams-colored">{viewers}</strong> personnes regardent {slug}
      </h3>
      <div className="flex-home">
        {streamData.map((stream, index) => (
          <GameStream key={index} {...stream} />
        ))}
      </div>
    </div>
  );
}

export default GamesStreams;
