import React, { useState } from "react";
import { loginApi } from "../apis/API";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  //useState (Setting input value)
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  //function for button
  const handleSubmit = (e) => {
    e.preventDefault();
    //check if the data input value is available
    console.log(phone, password);

    //making json data
    const data = {
      phone: phone,
      password: password,
    };

    //making api call
    loginApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);

          localStorage.setItem("token", res.data.token);
          onLogin(res.data.userData);
        }
      })
      .catch((err) => {
        toast.error("Server error!");
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row border rounded-5 p-3 col-md-6 bg-white shadow box-area d-flex align-items-stretch">
          <div className="right-box">
            <div className="row align-items-center">
              <div className="header-text mt-2 text-center">
                <h2 className="fw-bold">Welcome Back!</h2>
              </div>
              <div className="input-group mb-3">
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  className="form-control form-control-lg bg-light fs-6 mt-3"
                  placeholder="Enter Your Phone Number..."
                />
              </div>
              <div className="input-group mb-3">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Enter Your Password..."
                />
              </div>
              <div style={{ height: "2.67px" }}></div>
              <div className="input-group mb-4">
                <button
                  className="btn btn-lg colored-button w-100 fs-8 fw-bold"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>
              <div
                className="text-center"
                style={{ fontSize: "11px", color: "grey" }}
              >
                <small className="align-items-center ">
                  Don't Have an Account?
                  <span className="ms-1">
                    <Link to={"/signup"} class="forgot-password">
                      Sign Up
                    </Link>
                  </span>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
