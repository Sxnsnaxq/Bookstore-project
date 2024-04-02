import React, { useState } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const his = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // ป้องกันการส่งค่าไปยังหน้าใหม่

    try {
      const response = await axios.get("https://localhost:7115/api/Users", {
        params: {
          username: username,
          password: password,
        },
      });

      // ตรวจสอบความสำเร็จของการล็อกอิน
      console.log(response.data); // ล็อกข้อมูลการตอบกลับ
      const user = response.data.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        console.log(user);
        his("/Homepage");
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error occurred while logging in:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-bordered input-info w-full max-w-full mb-4"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered input-info w-full max-w-full mb-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign In
              </button>
              <div className="flex items-center justify-center mt-4">
                <Link
                  to="/Register"
                  className="text-indigo-600 hover:text-indigo-500 text-sm border-b border-indigo-600"
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
