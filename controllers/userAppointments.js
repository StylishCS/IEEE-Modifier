const { conn } = require("../DB/db");

async function makeAppointmentController(req, res) {
  try {
    let { date, time, seatsNum } = req.body;
    const query = `INSERT INTO appointments (clientId, clientName, phone, date, time, seatsNum) VALUES ('${req.userId}', '${req.user.name}', '${req.user.phone}', '${date}','${time}', '${seatsNum}')`;
    conn.execute(query, (err) => {
      if (err) throw err;
      return res.status(201).json("Appointment Made.");
    });
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getAppointmentsController(req, res) {
  try {
    const query = `SELECT * FROM appointments WHERE clientId = ?`;
    conn.execute(query, [req.userId], (err, data) => {
      if (err) throw err;
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getAppointmentByIdController(req, res) {
  try {
    const query = `SELECT * FROM appointments WHERE id = ?`;
    conn.execute(query, [req.params.id], (err, data) => {
      if (err) throw err;
      if (data.length == 0)
        return res.status(404).json("Appointment Not Found.");
      return res.status(200).json(data[0]);
    });
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}
module.exports = {
  makeAppointmentController,
  getAppointmentsController,
  getAppointmentByIdController,
};
