export interface KhoiKienThuc {
    id: number;
    name: string;
  }
 
  const STORAGE_KEY = 'khoiKienThuc';
 
  // Lấy danh sách khối kiến thức từ localStorage
  export const getKhoiKienThuc = (): KhoiKienThuc[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  };
 
  // Lưu danh sách khối kiến thức vào localStorage
  const saveKhoiKienThuc = (data: KhoiKienThuc[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };
 
  // Thêm khối kiến thức mới
  export const addKhoiKienThuc = (name: string): boolean => {
    const data = getKhoiKienThuc();
    if (data.some((item) => item.name === name)) {
      return false; // Trùng tên
    }
    const newItem: KhoiKienThuc = { id: Date.now(), name };
    saveKhoiKienThuc([...data, newItem]);
    return true;
  };
 
  // Cập nhật tên khối kiến thức
  export const updateKhoiKienThuc = (id: number, name: string): boolean => {
    const data = getKhoiKienThuc();
    if (data.some((item) => item.id !== id && item.name === name)) {
      return false; // Trùng tên
    }
    const updatedData = data.map((item) => (item.id === id ? { ...item, name } : item));
    saveKhoiKienThuc(updatedData);
    return true;
  };
 
  // Xóa khối kiến thức
  export const deleteKhoiKienThuc = (id: number) => {
    const data = getKhoiKienThuc().filter((item) => item.id !== id);
    saveKhoiKienThuc(data);
  };
 
