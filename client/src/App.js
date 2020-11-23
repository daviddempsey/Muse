import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import DefaultLayout from './pages/DefaultLayout';
import './styles/index.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={DefaultLayout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
