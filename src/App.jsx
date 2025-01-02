import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import YourOrdersPage from "./pages/YourOrdersPage";
import TrackOrder from "./pages/TrackOrder";
import Clothing from './category/Clothing';
import Electronics from './category/Electronics';
import Sports from './category/Sports';
import Books from './category/Books';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/CheckoutPage" element={<CheckoutPage />} />
        <Route path="/YourOrdersPage" element={<YourOrdersPage />} />
        <Route path="/TrackOrder" element={<TrackOrder />} />
        <Route path="/Clothing" element={<Clothing />} />
        <Route path="/Electronics" element={<Electronics />} />
        <Route path="/Sports" element={<Sports />} />
        <Route path="/Books" element={<Books />} />
        <Route path="/" element={<Navigate to="/Home" />} />
      </Routes>
    </Router>
  );
};

export default App;
