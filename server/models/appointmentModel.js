const db = require('../config/db');

// Lấy danh sách tất cả lịch hẹn
const getAllAppointments = async () => {
  const sql = `
    SELECT a.id, a.appointment_date, a.status,
           u.name AS customer_name, e.id AS employee_id, e.bio AS employee_bio,
           s.id AS service_id, s.name AS service_name, s.price
    FROM appointments a
    JOIN users u ON a.customer_id = u.id
    JOIN employees e ON a.employee_id = e.id
    JOIN services s ON a.service_id = s.id
  `;
  const [appointments] = await db.query(sql);
  return appointments;
};

// Tạo lịch hẹn mới
const addAppointment = async (customer_id, employee_id, service_id, appointment_date, status = 'pending') => {
  const sql = `
    INSERT INTO appointments (customer_id, employee_id, service_id, appointment_date, status, created_at)
    VALUES (?, ?, ?, ?, ?, NOW())
  `;
  const [result] = await db.query(sql, [customer_id, employee_id, service_id, appointment_date, status]);
  return { id: result.insertId, customer_id, employee_id, service_id, appointment_date, status };
};

// Cập nhật lịch hẹn
const updateAppointment = async (id, appointment_date, status) => {
  const sql = `
    UPDATE appointments SET appointment_date = ?, status = ? WHERE id = ?
  `;
  const [result] = await db.query(sql, [appointment_date, status, id]);
  return result.affectedRows > 0; // Trả về true nếu cập nhật thành công
};

// Xóa lịch hẹn
const deleteAppointment = async (id) => {
  const sql = `DELETE FROM appointments WHERE id = ?`;
  const [result] = await db.query(sql, [id]);
  return result.affectedRows > 0; // Trả về true nếu xóa thành công
};

module.exports = {
  getAllAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
};
