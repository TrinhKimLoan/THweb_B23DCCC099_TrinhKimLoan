import { useEffect, useState } from 'react';
import { fetchCompletedAppointments, submitReview } from '@/services/management/reviews/reviewApi';
import ReviewForm from '../reviews/ReviewForm';

interface Appointment {
  id: number;
  service_name: string;
  appointment_date: string;
}

interface ReviewData {
  rating: number;
  comment: string;
}

export default function CustomerReviewsPage() {
  const customerId = 1; // giả lập customer ID
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    fetchCompletedAppointments(customerId).then(res => setAppointments(res.data));
  }, []);

  const handleReviewSubmit = (appointmentId: number, data: ReviewData) => {
    submitReview(appointmentId, data).then(() => {
      alert('Đã gửi đánh giá!');
      // reload hoặc mark appointment đã đánh giá nếu cần
    });
  };

  return (
    <div>
      <h2>Lịch hẹn đã hoàn thành</h2>
      {appointments.map(appt => (
        <div key={appt.id} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 10 }}>
          <p><b>Dịch vụ:</b> {appt.service_name}</p>
          <p><b>Ngày:</b> {appt.appointment_date}</p>
          <ReviewForm appointmentId={appt.id} onSubmit={handleReviewSubmit} />
        </div>
      ))}
    </div>
  );
}
