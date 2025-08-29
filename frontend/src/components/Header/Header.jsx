import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../images/antiquelogo.jpg';

const Header = () => {
  const [showInfoBar, setShowInfoBar] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInfoBar(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Hardcoded credentials
    const adminUser = "usman";
    const adminPass = "12345";

    if (username === adminUser && password === adminPass) {
      setError("");
      setShowLogin(false);
      navigate("/dashboard"); // ✅ redirect to dashboard
    } else {
      setError("Incorrect credentials, try again!");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full shadow-md z-50 bg-white overflow-hidden">
      {/* Top Info Bar */}
      {showInfoBar && (
        <div className="bg-primary text-gray-800 text-sm px-4 py-2 animate-slide-down">
          <p className="text-center font-semibold text-white  lg:text-lg">
            Explore our unique collections of <strong>Antiques</strong>, <strong>Jewellery</strong>, and <strong>Gemstones</strong>! 
            Enjoy <strong>up to 30% off</strong> on selected items.
          </p>
        </div>
      )}

      {/* Main Navigation */}
      <div className="bg-white flex items-center justify-around px-4 md:px-8 py-3">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <NavLink to='/'>
            <img className="lg:w-60 w-48" src={logo} alt="Logo" />
          </NavLink>
        </div>

        {/* Center Links */}
        <nav className="hidden md:flex gap-6 text-gray-700">
          <NavLink to="/" className={({ isActive }) =>
            isActive ? "text-yellow-600 font-bold border-b-2 border-b-yellow-600"
              : "hover:text-yellow-600 font-semibold"}>Home</NavLink>
          <NavLink to="/antiques" className={({ isActive }) =>
            isActive ? "text-yellow-600 font-bold border-b-2 border-b-yellow-600"
              : "hover:text-yellow-600 font-semibold"}>Antiques</NavLink>
          <NavLink to="/jewellery" className={({ isActive }) =>
            isActive ? "text-yellow-600 font-bold border-b-2 border-b-yellow-600"
              : "hover:text-yellow-600 font-semibold"}>Jewellery</NavLink>
          <NavLink to="/gemstones" className={({ isActive }) =>
            isActive ? "text-yellow-600 font-bold border-b-2 border-b-yellow-600"
              : "hover:text-yellow-600 font-semibold"}>Gemstones</NavLink>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <FaSearch className="text-gray-700 lg:text-4xl cursor-pointer hover:text-yellow-600" />
          <FaShoppingCart className="text-gray-700 lg:text-4xl cursor-pointer hover:text-yellow-600" />

          {/* Admin Button */}
          <button
            onClick={() => setShowLogin(true)}
            className="relative hidden lg:block w-full bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg overflow-hidden group"
          >
            <span className="absolute inset-0 bg-primary translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
            <span className="relative z-10 group-hover:text-white">Admin</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          <NavLink to="/antiques" className="block border-b border-t border-t-primary text-gray-700 hover:text-yellow-600" onClick={() => setMenuOpen(false)}>Antiques</NavLink>
          <NavLink to="/jewellery" className="block border-b text-gray-700 hover:text-yellow-600" onClick={() => setMenuOpen(false)}>Jewellery</NavLink>
          <NavLink to="/gemstones" className="block border-b text-gray-700 hover:text-yellow-600" onClick={() => setMenuOpen(false)}>Gemstones</NavLink>
          <button
            onClick={() => { setMenuOpen(false); setShowLogin(true); }}
            className="w-full bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Admin
          </button>
        </div>
      )}

      {/* ✅ Admin Login Popup */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
          <div className="bg-white p-6 rounded-lg w-96 relative shadow-lg">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-600"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
