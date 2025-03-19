import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, message } from 'antd';
import { getAppointments, updateAppointmentStatus } from '@/services/management/appService/apiService';

const StaffAppointments = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchAppointments = async () => {
      setLoading(true);
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (err) {
        message.error('Lỗi khi tải lịch hẹn');
      }
      setLoading(false);
    };
  useEffect(() => {
    fetchAppointments();
  }, []);

  

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateAppointmentStatus(id, status);
      message.success('Cập nhật trạng thái thành công!');
      fetchAppointments();
    } catch (err) {
      message.error('Lỗi khi cập nhật trạng thái');
    }
  };

  const columns = [
    { title: 'Mã lịch hẹn', dataIndex: 'id', key: 'id' },
    { title: 'Khách hàng', dataIndex: 'customer_id', key: 'customer_id' },
    { title: 'Nhân viên', dataIndex: 'employee_id', key: 'employee_id' },
    { title: 'Dịch vụ', dataIndex: 'service_id', key: 'service_id' },
    { title: 'Ngày giờ', dataIndex: 'appointment_date', key: 'appointment_date' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status',
      render: (status: string) => <Tag color={status === 'completed' ? 'green' : status === 'pending' ? 'orange' : 'blue'}>{status.toUpperCase()}</Tag>,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (record: any) => (
        <>
          {record.status !== 'completed' && (
            <Button type="link" onClick={() => handleStatusChange(record.id, 'completed')}>Hoàn thành</Button>
          )}
          {record.status !== 'cancelled' && (
            <Button type="link" danger onClick={() => handleStatusChange(record.id, 'cancelled')}>Huỷ</Button>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Quản lý lịch hẹn của nhân viên</h2>
      <Table columns={columns} dataSource={appointments} loading={loading} rowKey="id" />
    </div>
  );
};

export default StaffAppointments;
