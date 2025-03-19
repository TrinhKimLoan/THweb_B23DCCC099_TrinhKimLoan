// apiService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // URL BE trực quan

export async function getEmployees() {
  return await axios.get(`${API_URL}/employees`).then((res) => res.data);
}

export async function createAppointment(data: any) {
  return await axios.post(`${API_URL}/appointments`, data).then((res) => res.data);
}

export async function getServices() {
  return await axios.get(`${API_URL}/services`).then((res) => res.data);
}

export async function getAppointments() {
  return await axios.get(`${API_URL}/appointments`).then((res) => res.data);
}

export async function updateAppointmentStatus(id: number, status: string) {
  return await axios.put(`${API_URL}/appointments/${id}`, { status }).then((res) => res.data);
}
