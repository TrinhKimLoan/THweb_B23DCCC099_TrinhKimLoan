// src/services/management/admin/statsService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/stats';

export async function getDailyStats() {
  try {
    const response = await axios.get(`${API_URL}/appointments?type=daily`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thống kê ngày:', error);
    return [];
  }
}

export async function getMonthlyStats() {
  try {
    const response = await axios.get(`${API_URL}/appointments?type=monthly`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thống kê tháng:', error);
    return [];
  }
}

export async function getRevenueStats() {
  try {
    const response = await axios.get(`${API_URL}/revenue`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thống kê doanh thu:', error);
    return { by_service: [], by_employee: [] };
  }
}

