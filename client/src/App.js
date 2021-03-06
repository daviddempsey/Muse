import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import LoadingPage from './pages/LoadingPage';
import ChatroomPage from './pages/ChatroomPage';
import FriendsPage from './pages/FriendsPage';
import InHarmonyPage from './pages/InHarmonyPage';
import LogoutPage from './pages/LogoutPage';
import './styles/index.css';
import { AuthProvider } from "./auth/Auth";
import MessagesLoadingPage from './pages/MessagesLoadingPage';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/profile/:user_email' component={ProfilePage} />
            <Route exact path='/logging' component={LoadingPage} />
            <PrivateRoute exact path='/messages' component={MessagesLoadingPage} />
            <PrivateRoute exact path='/messages/:receiver_id' component={ChatroomPage} />
            <PrivateRoute exact path='/friends' component={FriendsPage} />
            <Route exact path='/logout' component={LogoutPage} />
            <PrivateRoute exact path='/harmony' component={InHarmonyPage} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
