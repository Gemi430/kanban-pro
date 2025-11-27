// client/src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // <-- This is VITAL!

const Layout = () => {
  return (
    // You can add your main navigation bar (Navbar) here later
    <div className="min-h-screen bg-gray-50"> 
      {/* The Outlet component renders the current child route 
        (e.g., Home, Login, Register) defined in App.jsx.
      */}
      <main className="container mx-auto p-4">
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;