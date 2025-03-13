import axios from "axios";

const API_URL = "http://localhost:5000/employees"; // Đường dẫn BE

// Lấy danh sách nhân viên
export async function getEmployees() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách nhân viên:", error);
    return [];
  }
}

// Thêm nhân viên mới
export async function addEmployee(data: any) {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("❌ Lỗi khi thêm nhân viên:", error);
  }
}

// Cập nhật nhân viên
export async function updateEmployee(id: number, data: any) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật nhân viên:", error);
  }
}

// Xóa nhân viên
export async function deleteEmployee(id: number) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Lỗi khi xóa nhân viên:", error);
  }
}
