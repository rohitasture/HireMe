import express from "express";
import {
  getConversation,
  updateConversation,
  getConversations,
  createConversation,
} from "../controllers/conversationController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);
router.get("/single/:id", verifyToken, getConversation);
router.put("/:id", verifyToken, updateConversation);

export default router;
