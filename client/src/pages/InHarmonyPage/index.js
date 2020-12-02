import React from 'react';
import './index.css';

import DefaultLayout from '../DefaultLayout';
import Leaderboard from './Leaderboard'
import IHGraphic from './in_harmony_graphic.svg'

const InHarmonyPage = () => {
  return (
    <div className="InHarmonyPage">
      <DefaultLayout>
          <Leaderboard/>
      </DefaultLayout>
    </div>
  );
};

export default InHarmonyPage;
