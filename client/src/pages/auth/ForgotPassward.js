import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";
const ForgotPassward = () => {
  const [email, setEmail] = useState("");
  const [newPassward, setNewPassward] = useState("");

  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-passward", {
        email,
        newPassward,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <Layout title={"Forgot-passward"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWARD</h4>
          <div class="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div class="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Best Friend Name"
              required
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              value={newPassward}
              onChange={(e) => setNewPassward(e.target.value)}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Make a Passsward"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary">
            RESET
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassward;
