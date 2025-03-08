import { useState } from 'react';
import {
  getKhoiKienThuc,
  addKhoiKienThuc,
  updateKhoiKienThuc,
  deleteKhoiKienThuc,
} from '@/services/ManageQuestion/khoikienthuc';


export default () => {
  const [data, setData] = useState(getKhoiKienThuc());


  const add = (name: string) => {
    const existing = data.find((item) => item.name === name);
    if (existing) {
      return false; // Báo lỗi trùng
    }
    if (addKhoiKienThuc(name)) {
      setData(getKhoiKienThuc());
      return true;
    }
    return false;
  };
 


  const update = (id: number, name: string) => {
    if (updateKhoiKienThuc(id, name)) {
      setData(getKhoiKienThuc());
    }
  };


  const remove = (id: number) => {
    deleteKhoiKienThuc(id);
    setData(getKhoiKienThuc());
  };


  return { data, add, update, remove };
};


