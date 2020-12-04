import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './index.css';

import DefaultLayout from '../DefaultLayout';
import Leaderboard from './Leaderboard'
import IHGraphic from './Leaderboard/in_harmony_graphic.svg'

class InHarmonyPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {};

  render = () => {
    return (
      <div>
        <div className="InHarmonyPage">
          <DefaultLayout>
            <h1>In Harmony</h1>
            <h2>Make a New Friend</h2>
            <img alt="graphic" class="graphic" src={IHGraphic} />
            <div className="leaderboard">
              <Leaderboard />
            </div>
          </DefaultLayout>
        </div>
      </div>
    );
  };
}

export default withRouter(InHarmonyPage);


/*
const InHarmonyPage = () => {
  return (
    <div className="InHarmonyPage">
      <DefaultLayout>
          <Leaderboard/>
      </DefaultLayout>
    </div>
  );
};

//export default InHarmonyPage;
export default withRouter(ProfilePage);
*/
