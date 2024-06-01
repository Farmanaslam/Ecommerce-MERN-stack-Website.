import { comparePassward, hashPassward } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";
//registering user function controller
export const registerController = async (req, res) => {
  try {
    const { name, email, passward, phone, address, answer } = req.body;
    if (!name || !passward || !phone || !address || !answer) {
      return res.send({ message: "!error occured" });
    }

    //checking existing user.....
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        message: "User Already Exist Please Login",
      });
    }

    //registering new user in databse...
    const hashedPassward = await hashPassward(passward);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      passward: hashedPassward,
      answer,
    }).save();
    res.status(201).send({
      success: true,
      message: "user registered successfully..",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registering user!!",
      error,
    });
  }
};

//login function controller
export const loginController = async (req, res) => {
  try {
    const { email, passward } = req.body;
    if (!email || !passward) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or passsward..",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User Not Found!",
        error,
      });
    }
    const match = await comparePassward(passward, user.passward);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Passward Mismatch!",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      messsage: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Login!",
      error,
    });
  }
};
export const testController = async (req, res) => {
  res.send("Protetected route");
};
export const forgotPasswardController = async (req, res) => {
  try {
    const { email, answer, newPassward } = req.body;
    if (!email) {
      res.status(400).send("email is required");
    }
    if (!answer) {
      res.status(400).send("answer is required");
    }
    if (!newPassward) {
      res.status(400).send("newPassward is required");
    }

    //check email is correct and answer is correct
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      res.status(400).send({
        success: false,
        message: "email or answer is incorrect",
      });
    }
    const hashed = await hashPassward(newPassward);
    await userModel.findByIdAndUpdate(user._id, { passward: newPassward });
    res.status(200).send({
      success: true,
      message: "Passward reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Something went wrong in forgot passward controller!",
      error,
    });
  }
};
//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, passward, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (passward && passward.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = passward ? await hashPassward(passward) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        passward: hashedPassword || user.passward,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//orders user controleer
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};
