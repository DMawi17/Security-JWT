import { Router } from "express";
import authCtrl from "../controllers/auth.controller.js";

const router = Router();

router.post("/auth/login", authCtrl.login);
router.get("/auth/logout", authCtrl.logout);

export default router;
