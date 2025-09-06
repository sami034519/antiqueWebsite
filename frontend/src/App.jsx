import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';   // 👈 import Provider
import { store } from './components/redux/Store';    // 👈 import your Redux store
import CartPage from './components/redux/Cartpage';
import Home from './components/home/Home';
import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Jewellery from './components/Jwellery/Jwellery';
import Antiques from './components/Antiques/Antiques';
import ProductGrid from './components/Gemstones/Gemstones';
import ScrollToTop from './components/ScrollToTop/Scrolltotop';

// Layout component handles header/footer visibility
function Layout() {
  const location = useLocation();
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
        <Route path="/cartpage" element={<CartPage />} />
      </Routes>
      {!isDashboard && <Footer />}
    </>
  );
}

function App() {
  return (
    <Provider store={store}>   {/* 👈 Wrap everything in Provider */}
      <Router>
        <Layout />
      </Router>
    </Provider>
  );
}

export default App;
