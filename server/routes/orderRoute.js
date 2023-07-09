import express from "express";
import {
  getOrders,
  intent,
  confirmOrder,
} from "../controllers/orderController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirmOrder);
export default router;
