import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const DefaultLayout = ({ children }) => {
  return <div className="container">
    <Header />
    {children}
    <Footer />
  </div>;
};
export default DefaultLayout;
