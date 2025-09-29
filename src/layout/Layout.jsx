import React from 'react';
import Navbar from '../pages/HomePage/Navbar';
import Footer from '../pages/HomePage/Footer';

const Layout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
