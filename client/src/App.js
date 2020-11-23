import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import './styles/index.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/profilepage' component={ProfilePage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
