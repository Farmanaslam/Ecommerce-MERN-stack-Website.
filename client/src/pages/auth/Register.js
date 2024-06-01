import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passward, setPassward] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        phone,
        passward,
        address,
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
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={"Register- Ecommerce App"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title"> SIGN UP</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              class="form-control"
              id="exampleInputEmail11"
              aria-describedby="emailHelp"
              placeholder="Enter Your Name"
              required
            />
          </div>
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
              type="password"
              value={passward}
              onChange={(e) => setPassward(e.target.value)}
              class="form-control"
              id="exampleInputPassword2"
              placeholder="Make a Passsward"
              required
            />
          </div>

          <div class="mb-3">
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              class="form-control"
              id="exampleInputEmail3"
              aria-describedby="emailHelp"
              placeholder="Enter Your Phone Number"
              required
            />
          </div>

          <div class="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              class="form-control"
              id="exampleInputEmail4"
              aria-describedby="emailHelp"
              placeholder="Enter Your Address"
              required
            />
          </div>

          <div class="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              class="form-control"
              id="exampleInputEmail5"
              aria-describedby="emailHelp"
              placeholder="What is your best friend name"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
