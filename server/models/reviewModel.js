const db = require('../config/db');

const getAllReviews = async () => {
  const [rows] = await db.query('SELECT * FROM reviews');
  return rows;
};

const addReview = async ({ appointment_id, rating, comment }) => {
  await db.query('INSERT INTO reviews (appointment_id, rating, comment, created_at) VALUES (?, ?, ?, NOW())', [appointment_id, rating, comment]);
};

const updateReview = async (id, { rating, comment, employee_response }) => {
  await db.query('UPDATE reviews SET rating = ?, comment = ?, employee_response = ? WHERE id = ?', [rating, comment, employee_response, id]);
};

const deleteReview = async (id) => {
  await db.query('DELETE FROM reviews WHERE id = ?', [id]);
};

// API mới: lấy review theo nhân viên
const getReviewsByEmployee = async (employeeId) => {
  const [rows] = await db.query(
    `SELECT r.* FROM reviews r
     JOIN appointments a ON r.appointment_id = a.id
     WHERE a.employee_id = ?`, [employeeId]
  );
  return rows;
};

// API mới: chỉ cập nhật employee_response
const updateEmployeeResponse = async (id, response) => {
  await db.query('UPDATE reviews SET employee_response = ? WHERE id = ?', [response, id]);
};

module.exports = {
  getAllReviews,
  addReview,
  updateReview,
  deleteReview,
  getReviewsByEmployee,
  updateEmployeeResponse
};
