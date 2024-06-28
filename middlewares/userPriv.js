const jwt = require("jsonwebtoken");
const { conn } = require("../DB/db");

async function UserPrivileges(req, res, next) {
  try {
    if (!req.header("Authorization")) {
      return res.status(401).json("FORBIDDEN");
    }
    const token = req.header("Authorization");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const query = `SELECT * FROM users WHERE id = ?`;
    conn.execute(query, [decoded.id], (err, data) => {
      if (err) throw err;
      if (data.length == 0) throw err;
      req.userId = decoded.id;
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json("FORBIDDEN");
  }
}

module.exports = UserPrivileges;
