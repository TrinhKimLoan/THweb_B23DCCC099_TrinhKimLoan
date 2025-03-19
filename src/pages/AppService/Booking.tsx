import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, DatePicker, message } from 'antd';
import dayjs from 'dayjs';
import { getEmployees, getServices } from '@/services/management/appService/apiService';
import { createAppointment } from '@/services/management/appService/apiService';

const { Option } = Select;

const BookingPage = () => {
  const [form] = Form.useForm();
  const [employees, setEmployees] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      console.log("Dữ liệu từ API getEmployees: ", data);
      setEmployees(data);
    } catch (error) {
      message.error('Lỗi khi lấy danh sách nhân viên');
    }
  };

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      message.error('Lỗi khi lấy danh sách dịch vụ');
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchServices();
  }, []);



  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        customer_id: 1, // tạm hardcode ID khách hàng giả lập
        employee_id: values.employee_id,
        service_id: values.service_id,
        appointment_date: values.appointment_date.format('YYYY-MM-DD HH:mm:ss'),
        status: 'pending',
      };
      await createAppointment(payload);
      message.success('Đặt lịch hẹn thành công!');
      form.resetFields();
    } catch (error) {
      message.error('Lỗi khi đặt lịch hẹn');
    }
  };

  return (
    <div>
      <h2>Đặt lịch hẹn mới</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="employee_id" label="Nhân viên" rules={[{ required: true }]}> 
          <Select placeholder="Chọn nhân viên">
            {employees.map((e) => (
              <Option key={e.id} value={e.id}>{e.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="service_id" label="Dịch vụ" rules={[{ required: true }]}> 
          <Select placeholder="Chọn dịch vụ">
            {services.map((s) => (
              <Option key={s.id} value={s.id}>{s.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="appointment_date" label="Ngày & Giờ" rules={[{ required: true }]}> 
          <DatePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>

        <Button type="primary" htmlType="submit">Đặt lịch</Button>
      </Form>
    </div>
  );
};

export default BookingPage;
