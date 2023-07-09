import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createReview,
  getReviews,
  // deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();
router.post("/", verifyToken, createReview);
router.get("/:serviceId", getReviews);
// router.delete("/:id", deleteReview);

export default router;
