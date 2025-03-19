import { request } from 'umi';
import axios from "axios";

const API_URL = "http://localhost:5000/services";

// Lấy danh sách dịch vụ
export async function getServices() {
 try {
   return await request(API_URL);
 } catch (error) {
   console.error("Lỗi khi lấy danh sách dịch vụ:", error);
   return [];
 }
}

// Thêm dịch vụ mới
export async function addService(data: any) {
 try {
   return await request(API_URL, {
     method: 'POST',
     data,
   });
 } catch (error) {
   console.error("Lỗi khi thêm dịch vụ:", error);
 }
}

// Cập nhật dịch vụ
export async function updateService(id: number, data: any) {
 try {
   return await request(`${API_URL}/${id}`, {
     method: 'PUT',
     data,
   });
 } catch (error) {
   console.error("Lỗi khi cập nhật dịch vụ:", error);
 }
}

// Xóa dịch vụ
export async function deleteService(id: number) {
 try {
   return await request(`${API_URL}/${id}`, {
     method: 'DELETE',
   });
 } catch (error) {
   console.error("Lỗi khi xóa dịch vụ:", error);
 }
}
