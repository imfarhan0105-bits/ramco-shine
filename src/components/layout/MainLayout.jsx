import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow pt-16"> {/* pt-16 offsets the 64px fixed navbar */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
