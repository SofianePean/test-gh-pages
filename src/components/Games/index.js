import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import api from '../../api';
import Game from './game';
import './games.scss';

function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get('https://api.twitch.tv/helix/games/top');
      // console.log(result.data.data);
      // Je stock le résultat de mon fetch dans un tableau
      const dataArray = result.data.data;
      // Je parcours mon tableau et je viens changer les valeur par défaut de "box_art_url" par les dimensions que je veux 
      const finalArray = dataArray.map((game) => {
        const newUrl = game.box_art_url
          .replace('{width}', '250')
          .replace('{height}', '300');
          // Je remplace la valeur la valeur par la nouvelle
        game.box_art_url = newUrl;
        return game;
      });
      // Je stock dans mon state le retour de mon .map()
      setGames(finalArray);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="games-title">Jeux les plus poluplaires</h1>
      <div className="flex-home">
        {games.map((game) => (
          //Pour chaque éléments du tableau je créer un components Game
          <Game key={game.id} name={game.name} box={game.box_art_url} id={game.id} />
        ))}
      </div>
    </div>
  );
}

export default Games;
