const serviceModel = require('../models/serviceModel');

// Lấy danh sách dịch vụ
const getAllServices = async (req, res) => {
  try {
    const services = await serviceModel.getAllServices();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách dịch vụ', error });
  }
};

// Thêm dịch vụ mới
const addService = async (req, res) => {
  const { name, description, price, duration } = req.body;
  try {
    await serviceModel.addService(name, description, price, duration);
    res.json({ message: 'Thêm dịch vụ thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm dịch vụ', error });
  }
};

// Cập nhật dịch vụ
const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, duration } = req.body;
  try {
    await serviceModel.updateService(id, name, description, price, duration);
    res.json({ message: 'Cập nhật dịch vụ thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật dịch vụ', error });
  }
};

// Xóa dịch vụ
const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    await serviceModel.deleteService(id);
    res.json({ message: 'Xóa dịch vụ thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa dịch vụ', error });
  }
};

module.exports = {
  getAllServices,
  addService,
  updateService,
  deleteService,
};
