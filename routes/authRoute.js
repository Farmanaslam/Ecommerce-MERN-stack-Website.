import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswardController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object..
const router = express.Router();
//registering user route
router.post("/register", registerController);
//user login route...
router.post("/login", loginController);

//forgot passward  route...
router.post("/forgot-passward", forgotPasswardController);

//test middleware route...
router.get("/test", requireSignIn, isAdmin, testController);

//protected route..
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected route..
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
//update profile
router.put("/profile", requireSignIn, updateProfileController);

//user order
router.get("/orders", requireSignIn, getOrdersController);

//all order
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);
// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
