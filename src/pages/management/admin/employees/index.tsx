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
  
      const schedule: any = {};
      ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].forEach(day => {
        schedule[day] = values.work_schedule?.[day] || [];
      });
  
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        bio: values.bio,
        work_schedule: schedule,
        max_appointments_per_day: values.max_appointments_per_day,
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
          const parsed = JSON.parse(schedule);
          return (
            <div>
              {Object.entries(parsed).map(([day, hours]: any) => (
                <div key={day}><b>{day}:</b> {hours.join(", ") || 'Nghỉ'}</div>
              ))}
            </div>
          );
        } catch {
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
          <Form.Item name="name" label="Tên nhân viên" rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
            <Input.Password placeholder="Nhập mật khẩu mặc định" />
          </Form.Item>

          <Form.Item name="bio" label="Chuyên môn" rules={[{ required: true, message: 'Vui lòng nhập chuyên môn' }]}>
            <Input />
          </Form.Item>

            {/* BẮT ĐẦU: Lịch làm việc */}
            <Form.List name="work_schedule">
              {(fields, { add, remove }) => (
                <>
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <Form.Item label={day} key={day}>
                      <Form.List name={[day]}>
                        {(dayFields, { add: addHour, remove: removeHour }) => (
                          <>
                            {dayFields.map(({ key, name }) => (
                              <div key={key} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                                <Form.Item
                                  name={name}
                                  rules={[{ required: true, message: 'Vui lòng nhập giờ (ví dụ: 09:00-12:00)' }]}
                                  style={{ flex: 1 }}
                                >
                                  <Input placeholder="09:00-12:00" />
                                </Form.Item>
                                <Button onClick={() => removeHour(name)} danger>Xóa</Button>
                              </div>
                            ))}
                            <Button type="dashed" onClick={() => addHour()}>+ Thêm giờ cho {day}</Button>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>
                  ))}
                </>
              )}
            </Form.List>
            {/* KẾT THÚC: Lịch làm việc */}

          <Form.Item name="max_appointments_per_day" label="Số lượng khách tối đa" rules={[{ required: true, message: 'Vui lòng nhập số lượng khách tối đa' }]}>
            <Input type="number" />
          </Form.Item>
        </Form>


      </Modal>
    </>
  );
};

export default EmployeeManagement;
