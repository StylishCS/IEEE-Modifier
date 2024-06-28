const { conn } = require("../DB/db");

async function addToMenuController(req, res) {
  try {
    let { name, category, price, description, image } = req.body;
    image = `http://localhost:3000/${req.file.filename}`;
    const query = `INSERT INTO menu (name, category, price, description, image, addedBy) VALUES ('${name}', '${category}', '${price}', '${description}', '${image}', '${req.adminId}')`;
    conn.execute(query, (err) => {
      if (err) throw err;
      return res.status(201).json("item added successfully");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getMenuItemsController(req, res) {
  try {
    let category = req.query.category;
    if (category) {
      const query = `SELECT * FROM menu WHERE category = ?`;
      conn.execute(query, [category], (err, data) => {
        if (err) throw err;
        return res.status(200).json(data);
      });
    } else {
      const query = `SELECT * FROM menu`;
      conn.execute(query, (err, data) => {
        if (err) throw err;
        return res.status(200).json(data);
      });
    }
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getMenuItemsByIdController(req, res) {
  try {
    const query = `SELECT * FROM menu WHERE id = ?`;
    conn.execute(query, [req.params.id], (err, data) => {
      if (err) throw err;
      if (data.length == 0) return res.status(404).json("Dish Not Found.");
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function updateMenuItemController(req, res) {
  try {
    const query = `SELECT * FROM menu WHERE id = ?`;
    let { name, category, price, description, image } = req.body;
    if (req.file) {
      image = `http://localhost:3000/${req.file.filename}`;
    }
    conn.execute(query, [req.params.id], (err, data) => {
      if (err) throw err;
      if (data.length == 0) return res.status(404).json("Dish Not Found.");
      name = name ? name : data[0].name;
      category = category ? category : data[0].category;
      price = price ? price : data[0].price;
      description = description ? description : data[0].description;
      image = image ? image : data[0].image;

      let updateQuery = `UPDATE menu SET name = ?, category = ?, price = ?, description = ?, image = ? WHERE id = ?`;
      conn.execute(
        updateQuery,
        [name, category, price, description, image, req.params.id],
        (err) => {
          if (err) throw err;
          return res.status(200).json("Dish Updated.");
        }
      );
    });
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function deleteMenuItemController(req, res) {
  try {
    const query = `SELECT * FROM menu WHERE id = ?`;
    conn.execute(query, [req.params.id], (err, data) => {
      if (err) throw err;
      if (data.length == 0) return res.status(404).json("Dish Not Found.");
      else {
        let deleteQuery = `DELETE FROM menu WHERE id = ?`;
        conn.execute(deleteQuery, [req.params.id], (deleteErr) => {
          if (deleteErr) throw deleteErr;
          return res.status(200).json("Deleted Successfully");
        });
      }
    });
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}
module.exports = {
  addToMenuController,
  getMenuItemsController,
  getMenuItemsByIdController,
  updateMenuItemController,
  deleteMenuItemController,
};
