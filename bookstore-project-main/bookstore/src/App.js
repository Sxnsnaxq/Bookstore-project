// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Homepage from "./page/Homepage";
import Login from "./page/Login";
import Register from "./page/Register";
import AddProduct from "./page/AddProduct";
import Cart from "./page/Cart";
import EditUp from "./page/EditUp";
import Product from "./page/Product";
import EditProdct from "./page/editProduct";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Homepage" replace />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/EditUp" element={<EditUp />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/EditProduct" element={<EditProdct />} />
      </Routes>
    </Router>
  );
};

export default App;
