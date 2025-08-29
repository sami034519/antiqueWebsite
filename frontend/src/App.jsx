import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
// Dummy page components (replace with real ones)
const Antiques = () => <div className="p-4">🪙 Welcome to Antiques</div>;
const Jewellery = () => <div className="p-4">💍 Discover Jewellery</div>;
const Gemstones = () => <div className="p-4">💎 Explore Gemstones</div>;


function App() {
  return (
    <Router>
      <Header />

      {/* Main content area */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/antiques" element={<Antiques />} />
        <Route path="/jewellery" element={<Jewellery />} />
        <Route path="/gemstones" element={<Gemstones />} />

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
