const Appointment = require('../models/appointmentModel');

// Lấy danh sách lịch hẹn
exports.getAllAppointments = async (req, res) => {
  try {
    console.log('📢 API GET /appointments được gọi');
    const appointments = await Appointment.getAllAppointments();
    console.log('📢 Dữ liệu trả về:', appointments);
    res.json(appointments);
  } catch (error) {
    console.error('❌ Lỗi khi lấy danh sách lịch hẹn:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Tạo lịch hẹn mới
exports.addAppointment = async (req, res) => {
  try {
    const { customer_id, employee_id, service_id, appointment_date } = req.body;
    if (!customer_id || !employee_id || !service_id || !appointment_date) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin lịch hẹn' });
    }

    const newAppointment = await Appointment.addAppointment(customer_id, employee_id, service_id, appointment_date);
    res.status(201).json({ message: 'Tạo lịch hẹn thành công!', appointment: newAppointment });
  } catch (error) {
    console.error('❌ Lỗi khi tạo lịch hẹn:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Cập nhật lịch hẹn
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { appointment_date, status } = req.body;

    const updated = await Appointment.updateAppointment(id, appointment_date, status);
    if (!updated) {
      return res.status(404).json({ message: 'Không tìm thấy lịch hẹn' });
    }

    res.json({ message: 'Cập nhật lịch hẹn thành công' });
  } catch (error) {
    console.error('❌ Lỗi khi cập nhật lịch hẹn:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Xóa lịch hẹn
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Appointment.deleteAppointment(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Không tìm thấy lịch hẹn' });
    }

    res.json({ message: 'Lịch hẹn đã bị hủy' });
  } catch (error) {
    console.error('❌ Lỗi khi xóa lịch hẹn:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};
