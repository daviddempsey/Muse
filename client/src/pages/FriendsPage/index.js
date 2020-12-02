import React from 'react';
import './index.css';

import DefaultLayout from '../DefaultLayout';
import FriendsPage from '../../components/Friends/friendPage';

export default function FriendPage() {
  return (
    <div id='friend-page'>
      <DefaultLayout>
        <div id='friends'>
          <FriendsPage />
        </div>
      </DefaultLayout>
    </div>
  );
}