import { Router } from "express";
import usrCtrl from "../controllers/users.controller.js";

const router = Router();

router.route("/users").post(usrCtrl.create).get(usrCtrl.list);
// router.param("userId", usrCtrl.userById);
// router
//     .route("/users/:userId")
//     .get(usrCtrl.read)
//     .put(usrCtrl.update)
//     .delete(usrCtrl.remove);

export default router;
