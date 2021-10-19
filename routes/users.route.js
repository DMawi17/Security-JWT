import { Router } from "express";
import usrCtrl from "../controllers/users.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = Router();

router.route("/users").post(usrCtrl.create).get(usrCtrl.list);
router.param("userId", usrCtrl.userById);
router
    .route("/users/:userId")
    .get(authCtrl.requireLogin, usrCtrl.read)
    .put(authCtrl.requireLogin, authCtrl.hasAuthorization, usrCtrl.update)
    .delete(authCtrl.requireLogin, authCtrl.hasAuthorization, usrCtrl.remove);

export default router;
