import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import socialMedia from "../src/components/SocialMedia";
import Biography from "../src/components/Biography";
import profileLink from "./components/profileLink";

function App() {
  Axios({
    method: "GET",
    url: "http://localhost:5000/",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res.data.message);
  });

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Switch>
          <Route path="/socialmedia" component={socialMedia}></Route>
          <Route path="/biography" component={Biography}></Route>
          <Route path= "/profileLink" component = {profileLink}></Route>
          <Route path="/currentTrack" component = {currentTrack}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
