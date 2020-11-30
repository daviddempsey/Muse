import React, {Component} from 'react';
import './index.css';


import DefaultLayout from '../DefaultLayout';
import FriendsPage from '../../components/friendPage';

export default class FriendPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {};

  render = () => {
    return (
      <div id='friend-page'>
        <DefaultLayout>
          <div id='friends'>
            <FriendsPage />
          </div>
        </DefaultLayout>
      </div>
    )
  }
}