import React, { useState } from "react";
import "./Login.css";
import Cookies from "js-cookie";
import axios from "axios";
import Loader from "../loader/Loader";

export default function Login({ setAuthenticatedUser }) {
  console.log("Login");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const Dashboard = () => {
    window.location.href = "/dashboard";
  };

  const handleLogin = async () => {
    setIsLoading(true);

    // try {
    console.log("Login");
    await axios

      .post("http://localhost:4001/login", {
        emailId: emailId,
        password: password,
      })
      // .then((res)=>)
      .then((response) => {
        console.log("checking response");
        setTimeout(()=>{
        if (response.data.status === "200") {
          Cookies.set("user_id", response.data.userId);
          Cookies.set("role", response.data.role);
          console.log(response.data.userId, response.data.role);
          setIsLoading(false);
          Dashboard();
        }},1000)
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setError("email or/and password wrong");
        }
      });
  };

  return (
    <div className=" main-login-container">
      <div className="back"></div>
      {/* {isLoading && <Loader />} */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-5 pt-5">
          <div className="login-container">
            <h2 className="text-white fs-3">LOGIN</h2>

            <div className="form-container">
              <form>
                <div className="form-group">
                  <label htmlFor="email" className="text-white">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="text-white">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button
                  type="button"
                  className="btn-login"
                  onClick={() => handleLogin()}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
