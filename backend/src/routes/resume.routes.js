import { Router } from "express";
import {
  generateResume,
  getUserResumes,
  getResumeById,
} from "../controllers/resume.controllers.js";
import protect from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/generate", protect, generateResume);
router.get("/", protect, getUserResumes);
router.get("/:id", protect, getResumeById);

export default router;
