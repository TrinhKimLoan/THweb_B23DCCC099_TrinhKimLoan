// const Employee = require('../models/employeeModel');

// // Lấy danh sách nhân viên
// exports.getAllEmployees = async (req, res) => {
//   try {
//     console.log('📢 API GET /employees được gọi'); // Debug
//     const employees = await Employee.getAllEmployees();
//     console.log('📢 Dữ liệu trả về:', employees); // Debug
//     res.json(employees);
//   } catch (error) {
//     console.error('❌ Lỗi khi lấy danh sách nhân viên:', error);
//     res.status(500).json({ message: 'Lỗi server', error });
//   }
// };

// // Lấy thông tin một nhân viên
// exports.getEmployeeById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(`📢 API GET /employees/${id} được gọi`);

//     const employee = await Employee.getEmployeeById(id);
//     if (!employee) {
//       return res.status(404).json({ message: 'Nhân viên không tồn tại' });
//     }
//     res.json(employee);
//   } catch (error) {
//     console.error('❌ Lỗi khi lấy nhân viên:', error);
//     res.status(500).json({ message: 'Lỗi server', error });
//   }
// };

// // Thêm nhân viên mới
// exports.addEmployee = async (req, res) => {
//   try {
//     const { name, email, password, bio, available_hours, max_appointments_per_day } = req.body;
//     if (!name || !email || !password || !bio || !available_hours || !max_appointments_per_day) {
//       return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
//     }

//     const userData = { name, email, password };
//     const employeeData = { bio, available_hours: JSON.stringify(available_hours), max_appointments_per_day };

//     const newEmployee = await Employee.addEmployee(userData, employeeData);
//     res.status(201).json({ message: 'Nhân viên đã được thêm!', employeeId: newEmployee.id });
//   } catch (error) {
//     console.error('❌ Lỗi khi thêm nhân viên:', error);
//     res.status(500).json({ message: 'Lỗi server', error });
//   }
// };

// // Cập nhật nhân viên
// exports.updateEmployee = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { bio, available_hours, max_appointments_per_day } = req.body;

//     const updated = await Employee.updateEmployee(id, {
//       bio,
//       available_hours: JSON.stringify(available_hours),
//       max_appointments_per_day,
//     });

//     if (!updated) {
//       return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
//     }

//     res.json({ message: 'Nhân viên đã được cập nhật' });
//   } catch (error) {
//     console.error('❌ Lỗi khi cập nhật nhân viên:', error);
//     res.status(500).json({ message: 'Lỗi server', error });
//   }
// };

// // Xóa nhân viên
// exports.deleteEmployee = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Employee.deleteEmployee(id);

//     if (!deleted) {
//       return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
//     }

//     res.json({ message: 'Nhân viên đã bị xóa' });
//   } catch (error) {
//     console.error('❌ Lỗi khi xóa nhân viên:', error);
//     res.status(500).json({ message: 'Lỗi server', error });
//   }
// };

const Employee = require('../models/employeeModel');

// Lấy danh sách nhân viên
exports.getAllEmployees = async (req, res) => {
  try {
    console.log('📢 API GET /employees được gọi');
    const employees = await Employee.getAllEmployees();
    res.json(employees);
  } catch (error) {
    console.error('❌ Lỗi khi lấy danh sách nhân viên:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Thêm nhân viên mới
exports.addEmployee = async (req, res) => {
  try {
    const { name, email, password, bio, work_schedule, max_appointments_per_day } = req.body;
    if (!name || !email || !password || !bio || !work_schedule || !max_appointments_per_day) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin nhân viên' });
    }

    const newEmployee = await Employee.addEmployee(name, email, password, bio, work_schedule, max_appointments_per_day);
    res.status(201).json({ message: 'Thêm nhân viên thành công!', employee: newEmployee });
  } catch (error) {
    console.error('❌ Lỗi khi thêm nhân viên:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Cập nhật nhân viên
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { bio, work_schedule, max_appointments_per_day } = req.body;

    const updated = await Employee.updateEmployee(id, bio, work_schedule, max_appointments_per_day);
    if (!updated) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
    }

    res.json({ message: 'Cập nhật nhân viên thành công' });
  } catch (error) {
    console.error('❌ Lỗi khi cập nhật nhân viên:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Xóa nhân viên
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Employee.deleteEmployee(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
    }

    res.json({ message: 'Nhân viên đã bị xóa' });
  } catch (error) {
    console.error('❌ Lỗi khi xóa nhân viên:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};
