// models/cauhoi.ts
import { useState, useEffect } from 'react';

export interface CauHoi {
  id: number;
  monHocId: number;
  khoiKienThucId: number;
  noiDung: string;
  mucDo: 'Dễ' | 'Trung bình' | 'Khó' | 'Rất khó';
}

const LOCAL_STORAGE_KEY = 'cauhoi_data';

export default function useCauHoiModel() {
  const [data, setData] = useState<CauHoi[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const add = (cauHoi: Omit<CauHoi, 'id'>) => {
    const newId = data.length ? Math.max(...data.map(q => q.id)) + 1 : 1;
    const newCauHoi = { id: newId, ...cauHoi };
    setData([...data, newCauHoi]);
  };

  const update = (id: number, updatedData: Partial<CauHoi>) => {
    setData(data.map(q => (q.id === id ? { ...q, ...updatedData } : q)));
  };

  const remove = (id: number) => {
    setData(data.filter(q => q.id !== id));
  };

  return { data, add, update, remove };
}
