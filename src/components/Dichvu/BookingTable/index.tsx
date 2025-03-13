import React from 'react';
import { Table, Tag } from 'antd';

interface BookingTableProps {
  appointments: any[];
}

const BookingTable: React.FC<BookingTableProps> = ({ appointments }) => {
  const columns = [
    { title: 'Ngày giờ', dataIndex: 'dateTime', key: 'dateTime' },
    { title: 'Nhân viên', dataIndex: 'employee', key: 'employee' },
    { title: 'Dịch vụ', dataIndex: 'service', key: 'service' },
    { title: 'Ghi chú', dataIndex: 'note', key: 'note' },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => {
        const color = status === 'Chờ duyệt' ? 'orange' : status === 'Xác nhận' ? 'blue' : status === 'Hoàn thành' ? 'green' : 'red';
        return <Tag color={color}>{status}</Tag>;
      }
    },
  ];

  return <Table columns={columns} dataSource={appointments} rowKey="dateTime" />;
};

export default BookingTable;
