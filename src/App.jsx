import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import WhoWeAre from './components/WhoWeAre';
import Admin from './Admin';
import ServiceDetail from './components/ServiceDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/who-we-are"  element={<WhoWeAre />} />
        <Route path="/admin"       element={<Admin />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
