const Stats = require("../models/statsModel");

// Xuất báo cáo số lượng lịch hẹn
exports.generateAppointmentStats = async (req, res) => {
  try {
    console.log("📢 API GET /stats/appointments được gọi");
    const stats = await Stats.generateAppointmentStats();
    console.log("📢 Báo cáo lịch hẹn:", stats);
    res.json(stats);
  } catch (error) {
    console.error("❌ Lỗi khi tạo báo cáo lịch hẹn:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Xuất báo cáo doanh thu
exports.generateRevenueStats = async (req, res) => {
  try {
    console.log("📢 API GET /stats/revenue được gọi");
    const stats = await Stats.generateRevenueStats();
    console.log("📢 Báo cáo doanh thu:", stats);
    res.json(stats);
  } catch (error) {
    console.error("❌ Lỗi khi tạo báo cáo doanh thu:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};
