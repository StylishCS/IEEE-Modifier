const bcrypt = require("bcrypt");
const { conn } = require("../DB/db");
const jwt = require("jsonwebtoken");

async function signupUserController(req, res) {
  try {
    let { name, email, password, phone, image } = req.body;
    let query = `SELECT * FROM users WHERE email = ?`;
    conn.execute(query, [email], (err, data) => {
      if (err) throw err;
      if (data.length > 0) return res.status(400).json("User already exists.");
      password = bcrypt.hashSync(password, 10);
      image = `http://localhost:3000/${req.file.filename}`;
      query = `INSERT INTO users (name, email, password, phone, image) VALUES ('${name}', '${email}', '${password}', '${phone}', '${image}')`;
      conn.execute(query, (err) => {
        if (err) throw err;
        return res.status(201).json("User registered successfully.");
      });
    });
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;
    let query = `SELECT * FROM users WHERE email = ?`;
    conn.execute(query, [email], (err, data) => {
      if (err) throw err;
      if (data.length == 0)
        return res.status(404).json("Wrong email or password");
      let valid = bcrypt.compareSync(password, data[0].password);
      if (!valid) return res.status(404).json("Wrong email or password");
      const token = jwt.sign(data[0], process.env.JWT_SECRET);
      return res.status(200).json({ user: data[0], token: token });
    });
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { signupUserController, loginUserController };
