import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import LoadingPage from './pages/LoadingPage';
import ChatroomPage from './pages/ChatroomPage';
import './styles/index.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/profile' component={ProfilePage} />
          <Route exact path='/logging' component={LoadingPage} />
          <Route exact path='/messaging' component={ChatroomPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
