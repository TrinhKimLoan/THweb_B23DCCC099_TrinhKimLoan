// src/pages/Dichvu/Booking/index.tsx
import React from 'react';
import { Form, Select, Button, message, Card } from 'antd';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import BookingTable from '@/components/Dichvu/BookingTable';
import MyDatepicker from '@/components/Dichvu/MyDatepicker';
import Chart from '@/components/Chart';
import TinyEditor from '@/components/Dichvu/TinyEditor';

const { Option } = Select;

interface BookingFormProps {
  dispatch: any;
  appointments: any[];
}

const BookingForm: React.FC<BookingFormProps> = ({ dispatch, appointments }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const { date, time, employee, service, note } = values;
    const dateTime = dayjs(date).format('YYYY-MM-DD') + ' ' + time;

    // Kiểm tra lịch trùng
    const isDuplicate = appointments.some(appointment =>
      appointment.dateTime === dateTime && appointment.employee === employee
    );

    if (isDuplicate) {
      message.error('Lịch đã bị trùng! Vui lòng chọn thời gian khác.');
      return;
    }

    dispatch({
      type: 'booking/addAppointment',
      payload: { dateTime, employee, service, note, status: 'Chờ duyệt' },
    });

    message.success('Đặt lịch thành công!');
    form.resetFields();
  };

  return (
    <Card title="Đặt lịch hẹn" bordered>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="date" label="Chọn ngày" rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}>
          <MyDatepicker format="YYYY-MM-DD" />
        </Form.Item>
        
        <Form.Item name="time" label="Chọn giờ" rules={[{ required: true, message: 'Vui lòng chọn giờ!' }]}>
          <Select>
            <Option value="09:00">09:00 AM</Option>
            <Option value="10:00">10:00 AM</Option>
            <Option value="11:00">11:00 AM</Option>
            <Option value="14:00">02:00 PM</Option>
            <Option value="15:00">03:00 PM</Option>
          </Select>
        </Form.Item>

        <Form.Item name="employee" label="Chọn nhân viên" rules={[{ required: true, message: 'Vui lòng chọn nhân viên!' }]}>
          <Select>
            <Option value="Nguyen Van A">Nguyen Van A</Option>
            <Option value="Tran Thi B">Tran Thi B</Option>
          </Select>
        </Form.Item>

        <Form.Item name="service" label="Chọn dịch vụ" rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}>
          <Select>
            <Option value="Cắt tóc">Cắt tóc</Option>
            <Option value="Spa">Spa</Option>
          </Select>
        </Form.Item>
        
        <Form.Item name="note" label="Ghi chú">
          <TinyEditor />
        </Form.Item>

        <Button type="primary" htmlType="submit">Đặt lịch</Button>
      </Form>
      
      <BookingTable appointments={appointments} />
      <Chart data={appointments} />


    </Card>
  );
};

export default connect(({ booking }: any) => ({
  appointments: booking.appointments,
}))(BookingForm);
