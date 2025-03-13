import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

interface MyDatepickerProps {
  format?: string;
}

const MyDatepicker: React.FC<MyDatepickerProps> = ({ format = 'YYYY-MM-DD' }) => {
  return <DatePicker format={format} defaultValue={dayjs() as any} />
  ;
};

export default MyDatepicker;