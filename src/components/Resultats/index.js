import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api';
import './Resultat.scss';

function Resultats() {
  const { slug } = useParams();

  const [result, setResult] = useState(true);
  const [streamerInfo, setStreamerInfo] = useState([]);

  const cleanSearch = slug.replace(/ /g, '');

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(`https://api.twitch.tv/helix/users?login=${cleanSearch}`);

      if (result.data.data.length === 0) {
        setResult(false);
      }
      else {
        setStreamerInfo(result.data.data);
      }
    };
    fetchData();
  }, [cleanSearch]);

  return (
    <div>
      <div className="resultat-container">
        <h4 className="resultat-container-title">Résultat de recherche</h4>
        {streamerInfo.map((stream, index) => (
          <div key={index} className="resultat-container-card">
            <img src={stream.profile_image_url} alt="résultat profile" className="resultat-container-card-img" />
            <div className="resultat-container-card-body">
              <h5 className="resultat-container-card-title">{stream.display_name}</h5>
              <div className="resultat-container-card-txt">{stream.description}</div>
              <Link
                className="link"
                to={{
                  pathname: `/live/${stream.login}`,
                }}
              >
                <div className="resultat-container-card-btn">Regarder {stream.display_name}</div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resultats;
