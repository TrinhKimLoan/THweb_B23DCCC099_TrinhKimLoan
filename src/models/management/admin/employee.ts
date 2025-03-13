// Quản lý nhân viên
import { useState, useCallback, useEffect } from 'react';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from '@/services/management/admin/employeeService';

export default function useEmployeeModel() {
  const [employees, setEmployees] = useState([]); // Danh sách nhân viên
  const [loading, setLoading] = useState(false); // Trạng thái loading

  // Lấy danh sách nhân viên
  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách nhân viên:", error);
    }
    setLoading(false);
  }, []);

  // Tự động gọi `fetchEmployees()` khi component được mount
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Thêm nhân viên mới
  const addNewEmployee = async (data: any) => {
    try {
      await addEmployee(data);
      await fetchEmployees(); // Cập nhật danh sách sau khi thêm
    } catch (error) {
      console.error("❌ Lỗi khi thêm nhân viên:", error);
    }
  };

  // Cập nhật nhân viên
  const updateEmployeeData = async (id: number, data: any) => {
    try {
      await updateEmployee(id, data);
      await fetchEmployees(); // Cập nhật danh sách sau khi sửa
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật nhân viên:", error);
    }
  };

  // Xóa nhân viên
  const deleteEmployeeData = async (id: number) => {
    try {
      await deleteEmployee(id);
      await fetchEmployees(); // Cập nhật danh sách sau khi xóa
    } catch (error) {
      console.error("❌ Lỗi khi xóa nhân viên:", error);
    }
  };

  return {
    employees,
    loading,
    fetchEmployees,
    addNewEmployee,
    updateEmployeeData,
    deleteEmployeeData,
  };
}
