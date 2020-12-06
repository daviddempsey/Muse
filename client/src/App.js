import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import LoadingPage from "./pages/LoadingPage";
import FriendsPage from "./pages/FriendsPage";
import "./styles/index.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/profile/:user_email" component={ProfilePage} />
          <Route exact path="/logging" component={LoadingPage} />
          <Route exact path="/friends" component={FriendsPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
