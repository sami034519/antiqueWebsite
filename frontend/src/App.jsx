import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/home/Home';
import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Jewellery from './components/Jwellery/Jwellery';
import Antiques from './components/Antiques/Antiques';
import ProductGrid from './components/Gemstones/Gemstones';
// Dummy page components (replace with real ones)
import ScrollToTop from './components/ScrollToTop/Scrolltotop';



function Layout() {
  const location = useLocation();

  // Check if we are on dashboard route
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Header />}
           <ScrollToTop/> 
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/antiques" element={<Antiques />} />
        <Route path="/jewellery" element={<Jewellery />} />
        <Route path="/gemstones" element={<ProductGrid />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>

      {!isDashboard && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
