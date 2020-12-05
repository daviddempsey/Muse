import React from 'react';
import './index.css';

import DefaultLayout from '../DefaultLayout';
import FriendsPage from '../../components/Friends/friendPage.js';
import { withRouter } from 'react-router-dom';

const FriendPage = () => {
  return (
    <DefaultLayout>
      <div id='friend-page'>
        <div id='friends'>
          <FriendsPage />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default withRouter(FriendPage);
