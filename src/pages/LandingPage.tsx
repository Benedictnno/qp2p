import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Steps from '../components/Steps';
import Commission from '../components/Commission';

const LandingPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Steps />
      <Commission />
    </div>
  );
};

export default LandingPage;
