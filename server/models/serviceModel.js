const db = require('../config/db');

// Lấy danh sách tất cả dịch vụ
const getAllServices = async () => {
  const [services] = await db.query('SELECT * FROM services');
  return services;
};

// Thêm dịch vụ mới
const addService = async (name, description, price, duration) => {
  const sql = `
    INSERT INTO services (name, description, price, duration, created_at) 
    VALUES (?, ?, ?, ?, NOW())
  `;
  const [result] = await db.query(sql, [name, description, price, duration]);
  return { id: result.insertId, name, description, price, duration };
};

// Cập nhật dịch vụ
const updateService = async (id, name, description, price, duration) => {
  const sql = `
    UPDATE services 
    SET name = ?, description = ?, price = ?, duration = ? 
    WHERE id = ?
  `;
  const [result] = await db.query(sql, [name, description, price, duration, id]);
  return result.affectedRows > 0; // Trả về true nếu cập nhật thành công
};

// Xóa dịch vụ
const deleteService = async (id) => {
  const sql = 'DELETE FROM services WHERE id = ?';
  const [result] = await db.query(sql, [id]);
  return result.affectedRows > 0; // Trả về true nếu xóa thành công
};

module.exports = {
  getAllServices,
  addService,
  updateService,
  deleteService,
};

