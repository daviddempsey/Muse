import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import LoadingPage from './pages/LoadingPage';
import ChatroomPage from './pages/ChatroomPage';
import FriendsPage from './pages/FriendsPage';
import InHarmonyPage from './pages/InHarmonyPage';
import LogoutPage from './pages/LogoutPage';
import './styles/index.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/profile/:user_email' component={ProfilePage} />
          <Route exact path='/logging' component={LoadingPage} />
          <Route exact path='/messages/:receiver_id' component={ChatroomPage} />
          <Route exact path='/friends' component={FriendsPage} />
          <Route exact path='/harmony' component={InHarmonyPage} />
          <Route exact path='/logout' component={LogoutPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
