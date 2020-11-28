import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import './styles/index.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/profile' component={ProfilePage} />
          <Route exact path='/editprofile' component={EditProfilePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
