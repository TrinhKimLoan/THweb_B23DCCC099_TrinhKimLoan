//  Mô tả: Giao diện quản lý nhân viên
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import useEmployeeModel from '@/models/management/admin/employee';

const EmployeeManagement = () => {
  const { employees, loading, fetchEmployees, addNewEmployee, updateEmployeeData, deleteEmployeeData } = useEmployeeModel();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleAdd = () => {
    setEditingEmployee(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: any) => {
    setEditingEmployee(record);
    form.setFieldsValue({
      ...record,
      work_schedule: JSON.stringify(record.work_schedule, null, 2), // Hiển thị JSON dễ đọc
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    await deleteEmployeeData(id);
    message.success("Nhân viên đã được xoá");
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        work_schedule: JSON.parse(values.work_schedule), // Chuyển thành object trước khi gửi
      };

      if (editingEmployee) {
        await updateEmployeeData(editingEmployee.id, payload);
        message.success("Cập nhật thành công");
      } else {
        await addNewEmployee(payload);
        message.success("Thêm mới thành công");
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error("❌ Lỗi khi lưu nhân viên:", error);
    }
  };

  const columns = [
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    { title: 'Chuyên môn', dataIndex: 'bio', key: 'bio' },
    { 
      title: 'Lịch làm việc', 
      dataIndex: 'work_schedule', 
      key: 'work_schedule', 
      render: (schedule: string) => {
        try {
          const parsedSchedule = JSON.parse(schedule);
          return Object.entries(parsedSchedule)
            .map(([day, hours]: any) => `${day}: ${hours.join(", ")}`)
            .join(" | ");
        } catch (error) {
          return "Dữ liệu lỗi";
        }
      }
    },
    { title: 'Số lượng khách tối đa', dataIndex: 'max_appointments_per_day', key: 'max_appointments_per_day' },
    { 
      title: 'Hành động', 
      key: 'action', 
      render: (_: any, record: any) => (
        <>
          <Button onClick={() => handleEdit(record)}>Sửa</Button>
          <Button onClick={() => handleDelete(record.id)} danger>Xóa</Button>
        </>
      ) 
    },
  ];

  return (
    <>
      <Button type="primary" onClick={handleAdd}>Thêm nhân viên</Button>
      <Table columns={columns} dataSource={employees} loading={loading} rowKey="id" />
      <Modal 
        title={editingEmployee ? "Chỉnh sửa nhân viên" : "Thêm nhân viên"} 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="bio" label="Chuyên môn" rules={[{ required: true, message: 'Vui lòng nhập chuyên môn' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="work_schedule" label="Lịch làm việc" rules={[{ required: true, message: 'Vui lòng nhập lịch làm việc' }]}>
            <Input.TextArea rows={3} placeholder='{"Monday": ["09:00-12:00"], "Tuesday": ["14:00-18:00"]}' />
          </Form.Item>
          <Form.Item name="max_appointments_per_day" label="Số lượng khách tối đa" rules={[{ required: true, message: 'Vui lòng nhập số lượng khách tối đa' }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EmployeeManagement;
