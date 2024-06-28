const { conn } = require("../DB/db");

async function getAllAppointmentsController(req, res) {
  try {
    const query = `SELECT * FROM appointments`;
    conn.execute(query, (err, data) => {
      if (err) throw err;
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function approveAppointmentController(req, res) {
  try {
    const query = `SELECT * FROM appointments WHERE id = ?`;
    conn.execute(query, [req.params.id], (err, data) => {
      if (err) throw err;
      if (data.length == 0)
        return res.status(404).json("Appointment Not Found.");

      const updateQuery = `UPDATE appointments SET approved = 1 where id = ?`;
      conn.execute(updateQuery, [req.params.id], (err) => {
        if (err) throw err;
        return res.status(200).json("Updated Successfully");
      });
    });
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { getAllAppointmentsController, approveAppointmentController };
