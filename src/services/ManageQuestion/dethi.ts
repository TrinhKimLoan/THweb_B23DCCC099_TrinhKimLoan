// services/managequestion/dethi.ts
import type { CauHoi } from '@/models/managequestion/cauhoi';

export interface CauTrucDeThi {
  id: number;
  name: string;
  cauHoiYeuCau: { soLuong: number; mucDo: string; khoiKienThucId: number }[];
}

export interface DeThi {
  id: number;
  name: string;
  monHocId: number;
  cauHoiIds: number[];
}

const LOCAL_STORAGE_CAU_TRUC = 'cau_truc_de_thi';
const LOCAL_STORAGE_DE_THI = 'de_thi';

const getCauTrucDeThi = (): CauTrucDeThi[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_CAU_TRUC);
  return data ? JSON.parse(data) : [];
};

const saveCauTrucDeThi = (data: CauTrucDeThi[]) => {
  localStorage.setItem(LOCAL_STORAGE_CAU_TRUC, JSON.stringify(data));
};

const getDeThi = (): DeThi[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_DE_THI);
  return data ? JSON.parse(data) : [];
};

const saveDeThi = (data: DeThi[]) => {
  localStorage.setItem(LOCAL_STORAGE_DE_THI, JSON.stringify(data));
};


const addCauTrucDeThi = (cauTruc: Omit<CauTrucDeThi, 'id'>) => {
  const cauTrucDeThi = getCauTrucDeThi();
  const newId = cauTrucDeThi.length ? Math.max(...cauTrucDeThi.map(c => c.id)) + 1 : 1;
  const newCauTruc = { id: newId, ...cauTruc };
  cauTrucDeThi.push(newCauTruc);
  saveCauTrucDeThi(cauTrucDeThi);
};

const removeCauTrucDeThi = (id: number) => {
  const cauTrucDeThi = getCauTrucDeThi().filter(c => c.id !== id);
  saveCauTrucDeThi(cauTrucDeThi);
};

const addDeThi = (deThi: Omit<DeThi, 'id'>) => {
  const deThiList = getDeThi();
  const newId = deThiList.length ? Math.max(...deThiList.map(d => d.id)) + 1 : 1;
  const newDeThi = { id: newId, ...deThi };
  deThiList.push(newDeThi);
  saveDeThi(deThiList);
};

const removeDeThi = (id: number) => {
  const deThiList = getDeThi().filter(d => d.id !== id);
  saveDeThi(deThiList);
};

// Tạo đề thi dựa trên cấu trúc
const generateDeThi = (monHocId: number, cauTruc: CauTrucDeThi, cauHoiData: CauHoi[]): number[] => {
  let selectedCauHoiIds: number[] = [];

  for (const yeuCau of cauTruc.cauHoiYeuCau) {
    const { soLuong, mucDo, khoiKienThucId } = yeuCau;
    const cauHoiPhuHop = cauHoiData
      .filter(q => q.monHocId === monHocId && q.mucDo === mucDo && q.khoiKienThucId === khoiKienThucId)
      .slice(0, soLuong);

    if (cauHoiPhuHop.length < soLuong) {
      return []; // Không đủ câu hỏi
    }
      // Bỏ qua các cấu trúc có ID tạm
    if (cauTruc.id === -1) {
      return cauTruc.cauHoiYeuCau.flatMap(yeuCau2 => 
        cauHoiData
          .filter(q => q.monHocId === monHocId && 
                      q.mucDo === yeuCau2.mucDo && 
                      q.khoiKienThucId === yeuCau2.khoiKienThucId)
          .slice(0, yeuCau2.soLuong)
          .map(q => q.id)
      );
    }

    selectedCauHoiIds = [...selectedCauHoiIds, ...cauHoiPhuHop.map(q => q.id)];
  }

  return selectedCauHoiIds;
};

export {  getCauTrucDeThi, saveCauTrucDeThi, addCauTrucDeThi, removeCauTrucDeThi, getDeThi, saveDeThi, addDeThi, removeDeThi, generateDeThi };
