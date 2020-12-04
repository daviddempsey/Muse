import React from 'react';
import './index.css';

import DefaultLayout from '../DefaultLayout';
import FriendsPage from '../../components/Friends/friendPage';

export default function FriendPage() {
  return (
    <DefaultLayout>
      <div id='friend-page'>
        <div id='friends'>
          <FriendsPage />
        </div>
      </div>
    </DefaultLayout>
  );
}