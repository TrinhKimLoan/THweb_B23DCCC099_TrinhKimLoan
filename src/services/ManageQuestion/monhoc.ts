const STORAGE_KEY = 'monHocList';


export interface MonHoc {
  id: number;
  name: string;
  soTinChi: number;
}


export const getMonHocList = (): MonHoc[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};


export const addMonHoc = (name: string, soTinChi: number): boolean => {
  const list = getMonHocList();
  if (list.some((mon) => mon.name === name)) return false;


  const newMon: MonHoc = {
    id: Date.now(),
    name,
    soTinChi,
  };


  localStorage.setItem(STORAGE_KEY, JSON.stringify([...list, newMon]));
  return true;
};


export const updateMonHoc = (id: number, name: string, soTinChi: number): boolean => {
  let list = getMonHocList();
  if (list.some((mon) => mon.name === name && mon.id !== id)) return false;


  list = list.map((mon) => (mon.id === id ? { ...mon, name, soTinChi } : mon));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return true;
};


export const deleteMonHoc = (id: number) => {
  const list = getMonHocList().filter((mon) => mon.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};


