import React, { useState, useEffect } from "react";
import Header from "../Header";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch("https://localhost:7115/api/Orders");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCart(data); // เก็บข้อมูลการสั่งซื้อที่ได้มาจาก API ใน state cart
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCartData();
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      // ส่งคำขอ DELETE เพื่อลบรายการที่ต้องการจาก API
      const response = await fetch(
        `https://localhost:7115/api/Orders/${itemId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      // หลังจากลบสำเร็จ ดึงข้อมูลการสั่งซื้อใหม่จาก API อีกครั้ง
      const updatedResponse = await fetch("https://localhost:7115/api/Orders");
      if (!updatedResponse.ok) {
        throw new Error("Failed to fetch updated data");
      }
      const updatedData = await updatedResponse.json();
      setCart(updatedData); // อัพเดทข้อมูลการสั่งซื้อใหม่ใน state cart
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <Header />
      <br />
      <br />
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-white sm:text-3xl">
                Order
              </h1>
            </header>

            <div className="mt-8">
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li key={item.id} className="flex items-center gap-4">
                    {/* Display product information in the cart */}
                    <div>
                      {/* Display image */}
                      <img
                        src={item.productImage}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <h3 className="text-sm text-gray-900">{item.title}</h3>
                      <p className="text-sm text-white">
                        ชื่อหนังสือ : {item.productname}, รายชื่อคนที่สั่งซื้อ :{" "}
                        {item.username}
                      </p>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      {/* Delete product button */}
                      <button
                        onClick={() => handleDeleteItem(item.orderID)}
                        className="text-red-500 bg-transparent border border-solid border-red-500 rounded px-3 py-1 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
