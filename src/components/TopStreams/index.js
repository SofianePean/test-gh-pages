import React, { useState, useEffect } from 'react';
import ItemTopStreams from './ItemTopStreams';
import api from '../../api';
import ItemSidebar from '../Header/Sidebar/ItemSidebar';
import './topstreams.scss';

function TopStream() {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // Appel à l'API pour récupérer les top stream
      const result = await api.get('https://api.twitch.tv/helix/streams');
      const dataArray = result.data.data;
      // Je viens map le tableau pour récupérer les id dont j'aurai besoin pour la suite
      const gameIds = dataArray.map((stream) => stream.game_id);
      const userIds = dataArray.map((stream) => stream.user_id);
      // console.log(gameIds);
      // console.log(userIds);
      // Création des url personnalisés
      const baseUrlGames = 'https://api.twitch.tv/helix/games?';
      const baseUrlUSers = 'https://api.twitch.tv/helix/users?';

      let queryParamsGame = '';
      let queryParamsUsers = '';
      // Je viens concaténer pour remplir mon url
      gameIds.map((id) => (queryParamsGame += `id=${id}&`));

      userIds.map((id) => (queryParamsUsers += `id=${id}&`));
      // Je viens additionner mes 2 bout d'url
      const urlFinalGames = baseUrlGames + queryParamsGame;
      const urlFinalUsers = baseUrlUSers + queryParamsUsers;

      // console.log(urlFinalGames);
      // console.log(urlFinalUsers);

      const gameNames = await api.get(urlFinalGames);
      const getUsers = await api.get(urlFinalUsers);

      const gameNamesArray = gameNames.data.data;
      const UsersArray = getUsers.data.data;
      // console.log(getNamesArray);
      // console.log(getUsersArray);
      // Création du tableua final
      const finalArray = dataArray.map((stream) => {
        stream.gameName = '';
        stream.login = '';

        gameNamesArray.forEach((name) => {
          UsersArray.forEach((user) => {
            if (stream.user_id === user.id && stream.game_id === name.id) {
              stream.truePic = user.profile_image_url;
              stream.gameName = name.name;
              stream.login = user.login;
            }
          });
        });
        // Ici je viens choisir la taille de mes images
        const newUrl = stream.thumbnail_url
          .replace('{width}', '320')
          .replace('{height}', '180');
        stream.thumbnail_url = newUrl;
        return stream;
      });
      setChannels(finalArray);
    };

    fetchData();
  }, []);
  return (
    <div className="games">
      <h1 className="games-title">Stream les plus populaires</h1>
      <div className="flex-home">
        {channels.map((channel) =>(
          <ItemTopStreams key={channel.id} {...channel} />
        ))}
      </div>
    </div>

  );
}

export default TopStream;
