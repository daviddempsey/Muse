import React from 'react';
import Header from './Header';
import Footer from './Footer';

import './index.css';

const DefaultLayout = ({ children }) => {
  return (
    <div className="container">
      <div className="content-wrap">
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
};
export default DefaultLayout;
