var express = require("express");
const { adminUserController } = require("../controllers/adminAuth");
const AdminPrivileges = require("../middlewares/adminPriv");
const {
  addToMenuController,
  getMenuItemsController,
  getMenuItemsByIdController,
  updateMenuItemController,
  deleteMenuItemController,
} = require("../controllers/menuController");
const upload = require("../utils/uploadImage");
const {
  getAllAppointmentsController,
  approveAppointmentController,
} = require("../controllers/adminAppointments");
var router = express.Router();

/* AUTH */
router.post("/login", adminUserController);
/* END OF AUTH */

/* MENU */
router.get("/menu", getMenuItemsController);
router.get("/menu/:id", getMenuItemsByIdController);
router.post(
  "/menu/add",
  AdminPrivileges,
  upload.single("image"),
  addToMenuController
);
router.patch(
  "/menu/:id",
  AdminPrivileges,
  upload.single("image"),
  updateMenuItemController
);
router.delete("/menu/:id", AdminPrivileges, deleteMenuItemController);
/* END OF MENU */

/* APPOINTMENTS */
router.get("/appointments", AdminPrivileges, getAllAppointmentsController);
router.patch(
  "/appointments/:id",
  AdminPrivileges,
  approveAppointmentController
);
/* END OF APPOINTMENTS */

module.exports = router;

/* GET home page. */
// router.post("/seed", upload.single("image"), function (req, res, next) {
//   try {
//     let { name, email, password, image } = req.body;
//     let query = `SELECT * FROM admins WHERE email = ?`;
//     conn.execute(query, [email], (err, data) => {
//       if (err) throw err;
//       if (data.length > 0) return res.status(400).json("User already exists.");
//       password = bcrypt.hashSync(password, 10);
//       image = `http://localhost:3000/${req.file.filename}`;
//       query = `INSERT INTO admins (name, email, password, image) VALUES ('${name}', '${email}', '${password}', '${image}')`;
//       conn.execute(query, (err) => {
//         if (err) throw err;
//         return res.status(201).json("User registered successfully.");
//       });
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json("INTERNAL SERVER ERROR");
//   }
// });
