import { useState, useEffect } from 'react';
import { getDeThi, saveDeThi, saveCauTrucDeThi, getCauTrucDeThi, generateDeThi } from '@/services/ManageQuestion/dethi';

// 🚀 Export interface từ models/dethi.ts
export interface DeThi {
  id: number;
  name: string;
  monHocId: number;
  cauTrucId?: number;
  cauHoiIds: number[];
}

export interface CauTrucDeThi {
  id: number;
  name: string;
  cauHoiYeuCau: { soLuong: number; mucDo: string; khoiKienThucId: number }[];
}

export default function useDeThiModel() {
  const [cauTrucDeThi, setCauTrucDeThi] = useState<CauTrucDeThi[]>(getCauTrucDeThi());
  const [deThi, setDeThi] = useState<DeThi[]>(getDeThi());

  useEffect(() => {
    saveCauTrucDeThi(cauTrucDeThi);
    saveDeThi(deThi);
  }, [cauTrucDeThi, deThi]);

  const addCauTruc = (cauTruc: Omit<CauTrucDeThi, 'id'>) => {
    const newId = cauTrucDeThi.length ? Math.max(...cauTrucDeThi.map(q => q.id)) + 1 : 1;
    setCauTrucDeThi([...cauTrucDeThi, { id: newId, ...cauTruc }]);
  };

  const removeCauTruc = (id: number) => {
    setCauTrucDeThi(cauTrucDeThi.filter(q => q.id !== id));
  };

  const addDeThi = (deThiMoi: Omit<DeThi, 'id'>) => {
    const newId = deThi.length ? Math.max(...deThi.map(q => q.id)) + 1 : 1;
    setDeThi([...deThi, { id: newId, ...deThiMoi }]);
  };

  const updateDeThi = (id: number, updatedData: Partial<DeThi>) => {
    setDeThi(deThi.map(q => (q.id === id ? { ...q, ...updatedData } : q)));
  };

  const removeDeThi = (id: number) => {
    setDeThi(deThi.filter(q => q.id !== id));
  };

  return { 
    data: deThi,
    cauTrucDeThi, 
    addCauTruc, 
    removeCauTruc, 
    addDeThi, 
    updateDeThi, 
    removeDeThi, 
    generateDeThi
  };
}
