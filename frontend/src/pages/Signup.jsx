import React, { useState } from "react";
import { createUserApi } from "../apis/API";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  //function for changing input value
  const changeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const changeLastName = (e) => {
    setLastName(e.target.value);
  };
  const changePhone = (e) => {
    setPhone(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  //function for button
  const handleSubmit = (e) => {
    e.preventDefault();
    //check if the data input value is available
    console.log(firstName, lastName, phone, password);

    //making json data
    const data = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      password: password,
    };

    //making api call
    createUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
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
                <h2 className="fw-bold">Create an Account!</h2>
              </div>
              <div className="input-group mb-3">
                <input
                  onChange={changeFirstName}
                  type="text"
                  className="form-control form-control-lg bg-light fs-6 mt-3"
                  placeholder="First Name..."
                />
                <input
                  onChange={changeLastName}
                  type="text"
                  className="form-control form-control-lg bg-light fs-6 mt-3"
                  placeholder="Last Name..."
                />
              </div>
              <div className="input-group mb-3">
                <input
                  onChange={changePhone}
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Enter Your Phone Number..."
                />
              </div>
              <div className="input-group mb-3">
                <input
                  onChange={changePassword}
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Create a Password..."
                />
              </div>
              <div className="input-group mb-3">
                <button
                  className="btn btn-lg btn-primary colored-button w-100 fs-8 fw-bold mt-2"
                  onClick={handleSubmit}
                >
                  Create Account
                </button>
              </div>
              <div
                className="text-center"
                style={{ fontSize: "11px", color: "grey" }}
              >
                <small className="align-items-center ">
                  Already Have an Account?
                  <span className="ms-1">
                    <Link to={"/login"} class="forgot-password">
                      Login
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

export default SignUp;
