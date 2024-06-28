const bcrypt = require("bcrypt");
const { conn } = require("../DB/db");
const jwt = require("jsonwebtoken");

async function adminUserController(req, res) {
  try {
    const { email, password } = req.body;
    let query = `SELECT * FROM admins WHERE email = ?`;
    conn.execute(query, [email], (err, data) => {
      if (err) throw err;
      if (data.length == 0)
        return res.status(404).json("Wrong email or password");
      let valid = bcrypt.compareSync(password, data[0].password);
      if (!valid) return res.status(404).json("Wrong email or password");
      const token = jwt.sign({ id: data[0].id }, process.env.ADMIN_JWT_SECRET);
      return res.status(200).json({ user: data[0], token: token });
    });
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { adminUserController };
