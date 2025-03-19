import { useEffect, useState } from 'react';
import { fetchEmployeeReviews, respondToReview } from '@/services/management/reviews/reviewApi';
import { Input, Rate } from 'antd';

interface Review {
  id: number;
  rating: number;
  comment: string;
  employee_response?: string;
}

export default function EmployeeReviewsPage() {
  const employeeId = 1; // giả lập employee ID
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchEmployeeReviews(employeeId).then(res => setReviews(res.data));
  }, []);

  const handleResponse = (reviewId: number, response: string) => {
    respondToReview(reviewId, response).then(() => {
      alert('Đã phản hồi!');
    });
  };

  return (
    <div>
      <h2>Đánh giá của khách hàng</h2>
      {reviews.map(r => (
        <div key={r.id} style={{ border: '1px solid #eee', marginBottom: 10, padding: 10 }}>
          <p><b>Rating:</b> <Rate value={r.rating} disabled /></p>
          <p><b>Nhận xét:</b> {r.comment}</p>
          <p><b>Phản hồi của bạn:</b> {r.employee_response || 'Chưa có'}</p>
          {!r.employee_response && (
            <div style={{ marginTop: 5 }}>
              <Input.TextArea
                rows={2}
                placeholder="Nhập phản hồi..."
                onBlur={(e) => handleResponse(r.id, e.target.value)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
