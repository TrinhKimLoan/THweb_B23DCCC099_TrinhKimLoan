// src/reviews/reviewsApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; 

// customerId là id nên sẽ là number hoặc string, tuỳ backend nhận gì (ở đây mình giả định là number)
export const fetchCompletedAppointments = (customerId: number) => 
    axios.get(`${API_URL}/appointments/completed/${customerId}`);
  
  export const submitReview = (appointmentId: number, data: { rating: number; comment: string }) => 
    axios.post(`${API_URL}/reviews`, { appointmentId, ...data });
  
  export const fetchEmployeeReviews = (employeeId: number) => 
    axios.get(`${API_URL}/reviews/employee/${employeeId}`);
  
  export const respondToReview = (reviewId: number, response: string) => 
    axios.put(`${API_URL}/reviews/${reviewId}`, { employee_response: response });
  