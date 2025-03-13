const db = require('../config/db');

// Lấy danh sách tất cả đánh giá
const getAllReviews = async () => {
  const sql = `
    SELECT r.id, r.rating, r.comment, r.employee_response, r.created_at,
           u.name AS customer_name, e.id AS employee_id, e.bio AS employee_bio
    FROM reviews r
    JOIN appointments a ON r.appointment_id = a.id
    JOIN users u ON a.customer_id = u.id
    JOIN employees e ON a.employee_id = e.id
  `;
  const [reviews] = await db.query(sql);
  return reviews;
};

// Thêm đánh giá mới
const addReview = async (appointment_id, rating, comment) => {
  const sql = `
    INSERT INTO reviews (appointment_id, rating, comment, created_at)
    VALUES (?, ?, ?, NOW())
  `;
  const [result] = await db.query(sql, [appointment_id, rating, comment]);
  return { id: result.insertId, appointment_id, rating, comment };
};

// Cập nhật đánh giá
const updateReview = async (id, rating, comment, employee_response) => {
  const sql = `
    UPDATE reviews SET rating = ?, comment = ?, employee_response = ? WHERE id = ?
  `;
  const [result] = await db.query(sql, [rating, comment, employee_response, id]);
  return result.affectedRows > 0;
};

// Xóa đánh giá
const deleteReview = async (id) => {
  const sql = `DELETE FROM reviews WHERE id = ?`;
  const [result] = await db.query(sql, [id]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllReviews,
  addReview,
  updateReview,
  deleteReview,
};
