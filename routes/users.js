var express = require("express");
const upload = require("../utils/uploadImage");
const {
  signupUserController,
  loginUserController,
} = require("../controllers/userAuth");
const UserPrivileges = require("../middlewares/userPriv");
const {
  makeAppointmentController,
  getAppointmentsController,
  getAppointmentByIdController,
} = require("../controllers/userAppointments");
var router = express.Router();

/* AUTH */
router.post("/signup", upload.single("image"), signupUserController);
router.post("/login", loginUserController);
/* END OF AUTH */

/* APPOINTMENTS */
router.post("/appointments", UserPrivileges, makeAppointmentController);
router.get("/appointments", UserPrivileges, getAppointmentsController);
router.get("/appointments/:id", UserPrivileges, getAppointmentByIdController);
/* END OF APPOINTMENTS */

module.exports = router;
