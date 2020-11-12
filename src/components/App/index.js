// == Import npm
import React from 'react';
import Header from '../Header';
import Sidebar from '../Header/Sidebar';
import Games from '../Games';
import TopStreams from '../TopStreams';
import GamesStreams from '../GamesStreams';
import Resultats from '../Resultats';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Live from '../Live';

// == Import
// import './styles/index.scss';

// == Composant
const App = () => (
  <Router>
    <div className="app">
      <Header />
      <Sidebar />
      <Switch>
        <Route exact path="/" component={Games} />
        <Route path="/top-streams" component={TopStreams} />
        <Route path="/live/:slug" component={Live} />
        <Route path="/game/:slug" component={GamesStreams} />
        <Route path="/resultats/:slug" component={Resultats} />
      </Switch>
    </div>
  </Router>
);

// == Export
export default App;
