const db = require("../config/db");

// Xóa báo cáo cũ hơn 24h
const deleteOldReports = async () => {
  const sql = `DELETE FROM reports WHERE created_at < NOW() - INTERVAL 1 DAY`;
  await db.query(sql);
};

// Tạo báo cáo số lượng lịch hẹn
const generateAppointmentStats = async () => {
  await deleteOldReports(); // Xóa dữ liệu cũ trước khi thêm mới
  const sql = `
    INSERT INTO reports (report_date, total_appointments, created_at)
    SELECT CURDATE(), COUNT(*), NOW()
    FROM appointments
    WHERE status IN ('confirmed', 'completed');
  `;
  await db.query(sql);

  // Lấy báo cáo vừa tạo
  const [latestReport] = await db.query("SELECT * FROM reports ORDER BY created_at DESC LIMIT 1");
  return latestReport[0];
};

// Tạo báo cáo doanh thu
const generateRevenueStats = async () => {
  await deleteOldReports();
  const sql = `
    INSERT INTO reports (report_date, total_revenue, created_at)
    SELECT CURDATE(), SUM(s.price), NOW()
    FROM appointments a
    JOIN services s ON a.service_id = s.id
    WHERE a.status = 'completed';
  `;
  await db.query(sql);

  // Lấy báo cáo vừa tạo
  const [latestReport] = await db.query("SELECT * FROM reports ORDER BY created_at DESC LIMIT 1");
  return latestReport[0];
};

module.exports = {
  generateAppointmentStats,
  generateRevenueStats,
};
