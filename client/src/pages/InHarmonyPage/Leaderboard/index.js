import React, { Component } from 'react';
import TopUsers from '../../../components/InHarmony/TopUsers'
import '../index.css';

class Leaderboard extends Component {
  constructor(props) {
    super(props);
//    let topUsers = [];
  }

  compareUsers = (user) => {

  }
  
  componentDidMount = () => {};

  render() {
    return (
      <div className="Leaderboard">
        <TopUsers />
      </div>
    );
  }
}

export default Leaderboard;
