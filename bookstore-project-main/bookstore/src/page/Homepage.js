// Homepage.js
import React, { useState, useEffect } from "react";
import Header from "../Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cart from "./Cart"; // นำเข้า Cart component มาใช้งาน

const Homepage = ({ handleAddToCart }) => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const history = useNavigate();
  const user = localStorage.getItem("user");
  const userjson = JSON.parse(user);

  const addToCart = async () => {
    try {
      if (!selectedBook || !userjson) {
        console.error("No book selected or user not logged in");
        console.log(addToCart);
        return;
      }

      const orderData = {
        username: userjson.username,
        productid: selectedBook.productid,
        productname: selectedBook.title,
        productImage : selectedBook.imageUrl,
      };

      // ส่งข้อมูล POST ไปยัง API
      const response = await axios.post(
        "https://localhost:7115/api/Orders",
        orderData
      );



      // ตรวจสอบ response หากสำเร็จให้แสดงข้อความ "จองหนังสือสำเร็จ" และเปิดลิงก์ไปยังหน้า Cart
      console.log("Order successfully added to cart.");
      history("/cart"); // เปิดลิงก์ไปยังหน้า Cart

      // ในกรณีที่ต้องการปรับปรุงสถานะหรือการแสดงผลหน้าเว็บต่อไป สามารถทำตามต้องการได้
    } catch (error) {
      console.error("Error adding order to cart:", error);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://localhost:7115/api/Books/");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const openModal = (index) => {
    setSelectedBook(books[index]);
    const modal = document.getElementById("my_modal_3");
    modal.showModal();
  };

  const closeModal = () => {
    setSelectedBook(null);
    const modal = document.getElementById("my_modal_3");
    modal.close();
  };

  return (
    <div>
      <Header />
      <br />
      <br />
      <div className="text-center mb-6 text-3xl text-white font-semibold text- ">
        Welcome to SUNNAM Bookstore
      </div>
      <div className="grid-container">
        {books.map((book, index) => (
          <div key={index} className="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img src={book.imageUrl} alt={book.title} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{book.title}</h2>
              <p>Author: {book.author}</p>
              <div className="card-actions flex justify-between items-center">
                <div className="text-3xl text-white font-semibold text-">
                  {book.price} ฿
                </div>
                <div>
                  <button onClick={() => openModal(index)} className="">
                    <box-icon type="solid" size="lg" name="cart"></box-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          {selectedBook && (
            <>
              <h3 className="font-bold text-lg">
                Are you sure to add this book to your cart?
              </h3>
              <img src={selectedBook.imageUrl} alt={selectedBook.title} />
              <h3 className="font-bold text-lg">{selectedBook.title}</h3>
              <p>Author: {selectedBook.author}</p>
              <p>ISBN: {selectedBook.isbn}</p>
              <p>Publication Year: {selectedBook.publication_year}</p>
              <p>Genre: {selectedBook.genre}</p>
              <p>Price: {selectedBook.price} ฿</p>
              <button onClick={addToCart} className="btn btn-primary">
                Add to Cart
              </button>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default Homepage;
