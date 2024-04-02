import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header";

const EditUp = () => {
  const [products, setProducts] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:7115/api/Books");
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7115/api/Books/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product: " + error.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(
        `https://localhost:7115/api/Books/${id}`
      );
      // console.log(response.data);
      localStorage.setItem("bookedit", JSON.stringify(response.data));
      history("/EditProduct");
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="text-xl text-center p-7 text-white font-semibold">
        Delete And Update{" "}
      </div>
      <div className="flex bg-white justify-center mx-auto text-black">
        {/* <h1>Edit and Delete Products</h1> */}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Publication Year</th>
              <th>Genre</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.author}</td>
                <td>{product.isbn}</td>
                <td>{product.publication_year}</td>
                <td>{product.genre}</td>
                <td>{product.price}</td>
                <td className="">
                  <button
                    className="mx-2"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditUp;
