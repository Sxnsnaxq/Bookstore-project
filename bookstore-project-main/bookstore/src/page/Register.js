import React, { useState } from "react";
import Header from "../Header";
import axios from "axios";
import { useNavigate } from "react-router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [formIncomplete, setFormIncomplete] = useState(false);
  const history = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value === confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    if (event.target.value === password) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && password && confirmPassword && phoneNumber && email) {
      if (password === confirmPassword) {
        // ทำการส่งข้อมูลไปยัง API หรือทำตามการจัดการที่ต้องการ
        const newuser = {
          username: username,
          password: password,
          email: email,
          phonnumber: phoneNumber,
        };
        axios.post("https://localhost:7115/api/Users", newuser);
        console.log("Registration Successful!");
        history("/login");
      } else {
        // แสดงข้อความแจ้งเตือนว่า Password และ Confirm Password ไม่ตรงกัน
        console.log("Password does not match!");
      }
    } else {
      // แสดงข้อความแจ้งเตือนว่ายังมีช่องที่ไม่ได้กรอกข้อมูล
      setFormIncomplete(true);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Register
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-bordered input-info w-full max-w-xs mb-4"
                  value={username}
                  onChange={handleUsernameChange}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered input-info w-full max-w-xs mb-4"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={`input input-bordered input-info w-full max-w-xs mb-4 ${
                    !passwordsMatch ? "border-red-500" : ""
                  }`}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <input
                  type="text"
                  placeholder="Phone number"
                  className="input input-bordered input-info w-full max-w-xs mb-4"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  inputMode="numeric" // บังคับให้กรอกเป็นตัวเลขเท่านั้น
                  pattern="[0-9]{10}" // กำหนด pattern ให้เป็นตัวเลข 10 หลัก
                  title="Please enter 10-digit phone number" // ข้อความเมื่อกรอกข้อมูลไม่ถูกต้อง
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered input-info w-full max-w-xs mb-4"
                  value={email}
                  onChange={handleEmailChange}
                />
                {formIncomplete && (
                  <p className="text-red-500 text-sm">
                    กรุณากรอกข้อมูลให้ครบถ้วน
                  </p>
                )}
                {!passwordsMatch && (
                  <p className="text-red-500 text-sm">รหัสผ่านไม่ตรงกัน</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
              <div className="flex items-center justify-center mt-4">
                <a
                  href="/Login"
                  className="text-indigo-600 hover:text-indigo-500 text-sm border-b border-indigo-600"
                >
                  Back to Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
