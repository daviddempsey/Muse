import React from 'react';
import './index.css';

import DefaultLayout from '../DefaultLayout';
import Overview from './Overview';
import FeaturedItems from './FeaturedItems';
import ProfileStats from './ProfileStats';

const ProfilePage = () => {
  return <div className="ProfilePage">
    <DefaultLayout>
      <div class="content">
        <Overview />
        <div className="row">
          <div className="column"><FeaturedItems /></div>
          <div className="column"><ProfileStats /></div>
        </div>
      </div>
    </DefaultLayout>
  </div>;
};
export default ProfilePage;
