const Review = require('../models/reviewModel');

// Lấy danh sách đánh giá
exports.getAllReviews = async (req, res) => {
  try {
    console.log('📢 API GET /reviews được gọi');
    const reviews = await Review.getAllReviews();
    console.log('📢 Dữ liệu trả về:', reviews);
    res.json(reviews);
  } catch (error) {
    console.error('❌ Lỗi khi lấy danh sách đánh giá:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Thêm đánh giá mới
exports.addReview = async (req, res) => {
  try {
    const { appointment_id, rating, comment } = req.body;
    if (!appointment_id || !rating || !comment) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin đánh giá' });
    }

    const newReview = await Review.addReview(appointment_id, rating, comment);
    res.status(201).json({ message: 'Thêm đánh giá thành công!', review: newReview });
  } catch (error) {
    console.error('❌ Lỗi khi thêm đánh giá:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Cập nhật đánh giá
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment, employee_response } = req.body;

    const updated = await Review.updateReview(id, rating, comment, employee_response);
    if (!updated) {
      return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
    }

    res.json({ message: 'Cập nhật đánh giá thành công' });
  } catch (error) {
    console.error('❌ Lỗi khi cập nhật đánh giá:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Xóa đánh giá
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Review.deleteReview(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
    }

    res.json({ message: 'Đánh giá đã bị xóa' });
  } catch (error) {
    console.error('❌ Lỗi khi xóa đánh giá:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};
