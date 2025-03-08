import { useState } from 'react';
import { getMonHocList, addMonHoc, updateMonHoc, deleteMonHoc } from '@/services/ManageQuestion/monhoc';


export default () => {
  const [data, setData] = useState(getMonHocList());


  const add = (name: string, soTinChi: number) => {
    if (addMonHoc(name, soTinChi)) {
      setData(getMonHocList());
      return true;
    }
    return false;
  };


  const update = (id: number, name: string, soTinChi: number) => {
    if (updateMonHoc(id, name, soTinChi)) {
      setData(getMonHocList());
      return true;
    }
    return false;
  };


  const remove = (id: number) => {
    deleteMonHoc(id);
    setData(getMonHocList());
  };


  return { data, add, update, remove };
};


