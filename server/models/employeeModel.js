// const db = require('../config/db');

// // Lấy danh sách nhân viên
// const getAllEmployees = async () => {
//   const sql = `
//     SELECT e.id, u.name, u.email, e.bio, e.available_hours, e.max_appointments_per_day
//     FROM employees e
//     JOIN users u ON e.user_id = u.id
//     WHERE u.role = 'employee'
//   `;
//   const [employees] = await db.query(sql);

//   // Chuyển đổi available_hours từ string sang JSON
//   return employees.map(emp => ({
//     ...emp,
//     available_hours: JSON.parse(emp.available_hours || '{}') // Nếu null thì gán {}
//   }));
// };


// // Lấy thông tin một nhân viên theo ID
// const getEmployeeById = async (id) => {
//   const sql = `
//     SELECT e.id, u.name, u.email, e.bio, e.available_hours, e.max_appointments_per_day
//     FROM employees e
//     JOIN users u ON e.user_id = u.id
//     WHERE e.id = ?
//   `;
//   const [employee] = await db.query(sql, [id]);
//   return employee[0]; // Trả về 1 nhân viên hoặc undefined
// };

// // Thêm nhân viên mới
// const addEmployee = async (userData, employeeData) => {
//   const connection = await db.getConnection(); // Không cần db.promise()
//   try {
//     await connection.beginTransaction();

//     const userSql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'employee')`;
//     const [userResult] = await connection.query(userSql, [
//       userData.name, userData.email, userData.password
//     ]);

//     const userId = userResult.insertId;
//     const employeeSql = `INSERT INTO employees (user_id, bio, available_hours, max_appointments_per_day) VALUES (?, ?, ?, ?)`;
//     await connection.query(employeeSql, [
//       userId, employeeData.bio, employeeData.available_hours, employeeData.max_appointments_per_day
//     ]);

//     await connection.commit();
//     return { id: userId, ...userData, ...employeeData };
//   } catch (error) {
//     await connection.rollback();
//     throw error;
//   } finally {
//     connection.release();
//   }
// };


// // Cập nhật nhân viên
// const updateEmployee = async (id, employeeData) => {
//   const sql = `UPDATE employees SET bio = ?, available_hours = ?, max_appointments_per_day = ? WHERE id = ?`;
//   const [result] = await db.query(sql, [
//     employeeData.bio, employeeData.available_hours, employeeData.max_appointments_per_day, id
//   ]);
//   return result.affectedRows > 0; // Trả về true nếu cập nhật thành công
// };

// // Xóa nhân viên
// const deleteEmployee = async (id) => {
//   const sql = `DELETE FROM employees WHERE id = ?`;
//   const [result] = await db.query(sql, [id]);
//   return result.affectedRows > 0; // Trả về true nếu xóa thành công
// };

// module.exports = { getAllEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployee };


const db = require("../config/db");

// Lấy danh sách nhân viên
const getAllEmployees = async () => {
  const sql = `
    SELECT e.id, u.name, u.email, e.bio, e.available_hours AS work_schedule, e.max_appointments_per_day
    FROM employees e
    JOIN users u ON e.user_id = u.id
    WHERE u.role = 'employee'
  `;
  const [employees] = await db.query(sql);
  return employees;
};

// Thêm nhân viên mới
const addEmployee = async (name, email, password, bio, work_schedule, max_appointments_per_day) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const userSql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'employee')`;
    const [userResult] = await connection.query(userSql, [name, email, password]);
    const userId = userResult.insertId;

    const employeeSql = `INSERT INTO employees (user_id, bio, available_hours, max_appointments_per_day) VALUES (?, ?, ?, ?)`;
    await connection.query(employeeSql, [userId, bio, JSON.stringify(work_schedule), max_appointments_per_day]);

    await connection.commit();
    return { id: userId, name, bio, work_schedule, max_appointments_per_day };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// Cập nhật nhân viên
const updateEmployee = async (id, bio, work_schedule, max_appointments_per_day) => {
  const sql = `
    UPDATE employees SET bio = ?, available_hours = ?, max_appointments_per_day = ? WHERE id = ?
  `;
  const [result] = await db.query(sql, [bio, JSON.stringify(work_schedule), max_appointments_per_day, id]);
  return result.affectedRows > 0;
};

// Xóa nhân viên
const deleteEmployee = async (id) => {
  const sql = `DELETE FROM employees WHERE id = ?`;
  const [result] = await db.query(sql, [id]);
  return result.affectedRows > 0;
};

module.exports = { getAllEmployees, addEmployee, updateEmployee, deleteEmployee };
