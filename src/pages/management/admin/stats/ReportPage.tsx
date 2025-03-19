// src/pages/management/admin/stats/ReportPage.tsx
import React, { useState } from 'react';
import { Button, Space, Table, Card, DatePicker, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Bar } from '@ant-design/charts';
import moment from 'moment';

import { getDailyStats, getMonthlyStats, getRevenueStats } from '@/services/management/admin/stats';

interface Appointment {
  date?: string;     // dạng '2025-03-20'
  month?: string;    // dạng '2025-03'
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

interface RevenueData {
  by_service: any[];
  by_employee: any[];
}

export default function ReportPage() {
  const [type, setType] = useState<'daily' | 'monthly' | 'revenue' | null>(null);

  // Dữ liệu hiển thị
  const [dailyData, setDailyData] = useState<{ status: string; count: number }[]>([]);
  const [monthlyData, setMonthlyData] = useState<{
    pending: { month: string; count: number }[];
    confirmed: { month: string; count: number }[];
    completed: { month: string; count: number }[];
    cancelled: { month: string; count: number }[];
  }>({
    pending: [], confirmed: [], completed: [], cancelled: [],
  });
  const [revenueData, setRevenueData] = useState<RevenueData>({ by_service: [], by_employee: [] });

  // Các state để chọn ngày / năm
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedYear, setSelectedYear] = useState(moment().year());

  // ============== BÁO CÁO NGÀY ==============
  const handleOkDaily = async () => {
    try {
      // Giả sử API trả về mảng appointments có { date, status }
      const appointments: Appointment[] = await getDailyStats();
      console.log('Data from getDailyStats:', appointments); // <-- Kiểm tra ở đây
      // Lọc ra appointment của ngày user chọn
      const dayStr = selectedDate.format('YYYY-MM-DD');
      const filtered = appointments.filter(
        (item) => item.date && moment(item.date).format('YYYY-MM-DD') === dayStr
      );

      // Đếm số lượng theo 4 trạng thái
      const statuses = ['pending', 'confirmed', 'completed', 'cancelled'] as const;
      const dailyResult = statuses.map((st) => {
        return {
          status: st,
          count: filtered.filter((f) => f.status === st).length,
        };
      });

      setDailyData(dailyResult);
    } catch (err) {
      message.error('Lỗi khi lấy báo cáo ngày!');
      console.error(err);
    }
  };

  // Table cho báo cáo ngày
  const dailyColumns: ColumnsType<{ status: string; count: number }> = [
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    { title: 'Số lượng', dataIndex: 'count', key: 'count' },
  ];

  // ============== BÁO CÁO THÁNG ==============
  // ...
const handleOkMonthly = async () => {
  try {
    // Giả sử API trả về mảng appointments có { month, status }
    const appointments: Appointment[] = await getMonthlyStats();

    // Các trạng thái cần hiển thị
    const statuses = ['pending', 'confirmed', 'completed', 'cancelled'] as const;

    // Tạo mảng 12 tháng, ban đầu count = 0, với 12 object độc lập
    const initData = Array.from({ length: 12 }, (_, i) => ({
      month: String(i + 1).padStart(2, '0'),
      count: 0,
    }));

    // Tạo 4 mảng cho 4 trạng thái bằng cách tạo deep copy của initData
    const result = {
      pending: initData.map(item => ({ ...item })),
      confirmed: initData.map(item => ({ ...item })),
      completed: initData.map(item => ({ ...item })),
      cancelled: initData.map(item => ({ ...item })),
    };

    // Lọc appointment theo năm được chọn (item.month dạng "YYYY-MM")
    const yearStr = selectedYear.toString();
    const filtered = appointments.filter((item) => {
      if (!item.month) return false;
      return item.month.startsWith(yearStr);
    });

    // Tính count cho từng tháng, theo từng trạng thái
    filtered.forEach((item) => {
      const mStr = item.month?.slice(5, 7); // Ví dụ: '03'
      const mIndex = Number(mStr) - 1;
      if (item.status === 'pending') {
        result.pending[mIndex].count++;
      } else if (item.status === 'confirmed') {
        result.confirmed[mIndex].count++;
      } else if (item.status === 'completed') {
        result.completed[mIndex].count++;
      } else if (item.status === 'cancelled') {
        result.cancelled[mIndex].count++;
      }
    });

    setMonthlyData(result);
  } catch (err) {
    message.error('Lỗi khi lấy báo cáo tháng!');
    console.error(err);
  }
};


  // ============== BÁO CÁO DOANH THU ==============
  const handleLoadRevenue = async () => {
    try {
      const data = await getRevenueStats();
      setRevenueData(data);
    } catch (err) {
      message.error('Lỗi khi lấy báo cáo doanh thu!');
      console.error(err);
    }
  };

  return (
    <Card title="Báo cáo thống kê">
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={() => setType('daily')}>Báo cáo ngày</Button>
        <Button onClick={() => setType('monthly')}>Báo cáo tháng</Button>
        <Button onClick={() => setType('revenue')}>Báo cáo doanh thu</Button>
      </Space>

      {type === 'daily' && (
        <div style={{ marginTop: 16 }}>
          <Space>
            <DatePicker
              placeholder="Chọn ngày"
              format="DD/MM/YYYY"
              value={selectedDate}
              onChange={(date) => {
                console.log('Ngày chọn:', date);
                setSelectedDate(date || moment());
              }}
            />
            <Button type="primary" onClick={handleOkDaily}>OK</Button>
          </Space>

          <Table
            style={{ marginTop: 16 }}
            columns={dailyColumns}
            dataSource={dailyData}
            rowKey={(r) => r.status}
          />
        </div>
      )}

      {type === 'monthly' && (
        <div style={{ marginTop: 16 }}>
          <Space>
            <DatePicker
              picker="year"
              placeholder="Chọn năm"
              value={moment(String(selectedYear), 'YYYY')}
              onChange={(date) => setSelectedYear(date?.year() || moment().year())}
            />
            <Button type="primary" onClick={handleOkMonthly}>OK</Button>
          </Space>

          {/* 4 biểu đồ cột, mỗi biểu đồ 1 trạng thái */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 16 }}>
            <div style={{ width: 300 }}>
              <h4>Pending</h4>
              <Bar
                data={monthlyData.pending.map((d) => ({ month: d.month, value: d.count })) || []}
                xField="month"
                yField="value"
                xAxis={{ title: { text: 'Tháng' } }}
                yAxis={{ title: { text: 'Số lịch hẹn (Pending)' } }}
              />

            </div>
            <div style={{ width: 300 }}>
              <h4>Confirmed</h4>
              <Bar
                data={monthlyData.confirmed.map((d) => ({ month: d.month, value: d.count })) || []}
                xField="month"
                yField="value"
                xAxis={{ title: { text: 'Tháng' } }}
                yAxis={{ title: { text: 'Số lịch hẹn (Confirmed)' } }}
              />
            </div>
            <div style={{ width: 300 }}>
              <h4>Completed</h4>
              <Bar
                data={monthlyData.completed.map((d) => ({ month: d.month, value: d.count })) || []}
                xField="month"
                yField="value"
                xAxis={{ title: { text: 'Tháng' } }}
                yAxis={{ title: { text: 'Số lịch hẹn (Completed)' } }}
              />
            </div>
            <div style={{ width: 300 }}>
              <h4>Cancelled</h4>
              <Bar
                data={monthlyData.cancelled.map((d) => ({ month: d.month, value: d.count })) || []}
                xField="month"
                yField="value"
                xAxis={{ title: { text: 'Tháng' } }}
                yAxis={{ title: { text: 'Số lịch hẹn (Cancelled)' } }}
              />
            </div>
          </div>
        </div>
      )}

      {type === 'revenue' && (
        <div style={{ marginTop: 16 }}>
          <Button type="primary" onClick={handleLoadRevenue}>Tải báo cáo doanh thu</Button>

          {/* Biểu đồ cột theo dịch vụ */}
          <h3 style={{ marginTop: 16 }}>Doanh thu theo dịch vụ</h3>
          <Bar
            data={Array.isArray(revenueData.by_service) ? revenueData.by_service : []}
            xField="name"
            yField="revenue"
            xAxis={{ title: { text: 'Dịch vụ' } }}
            yAxis={{ title: { text: 'Doanh thu (VND)' } }}
          />

          {/* Biểu đồ cột theo nhân viên */}
          <h3 style={{ marginTop: 32 }}>Doanh thu theo nhân viên</h3>
          <Bar
            data={Array.isArray(revenueData.by_employee) ? revenueData.by_employee : []}
            xField="name"
            yField="revenue"
            xAxis={{ title: { text: 'Nhân viên' } }}
            yAxis={{ title: { text: 'Doanh thu (VND)' } }}
          />
        </div>
      )}
    </Card>
  );
}
