import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import "../../styles/AuthStyles.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [passward, setPassward] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        passward,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  };
  return (
    <Layout title={"Login- Ecommerce App"}>
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={passward}
              onChange={(e) => setPassward(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Make a Passsward"
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="btn forgot-btn"
              onClick={() => navigate("/forgot-passward")}
            >
              Forgot Passward
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
