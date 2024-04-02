import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Correct import statement for Link
import "./Header.css";
import "boxicons";

const Header = () => {
  const user = localStorage.getItem("user");
  const userjson = JSON.parse(user);
  const his = useNavigate();
  const Logout = () => {
    localStorage.removeItem("user");
    his("/login");
  };
  return (
    <header>
      <img src="https://japaclip.com/en/files/bookstore.png" width="80" />
      <div class="container relative group">
        <div>
          <a href="/HomePage">HomePage</a>
        </div>
        <div>
          <a href="/AddProduct">Add Product</a>
        </div>
        <div>
          <a href="/EditUp">Edit&Update</a>
        </div>
      </div>
      <Link to="/Cart">
        <box-icon type="solid" size="lg" name="cart"></box-icon>
      </Link>
      <div tabindex="0">
        <div class="w-20 rounded-full">
          {!userjson && (
            <Link to="/Login">
              <box-icon name="user-circle" size="lg" color="red"></box-icon>
            </Link>
          )}
          {userjson && (
            <button
              onClick={Logout}
              className="btn btn-primary m-3 font-semibold bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
