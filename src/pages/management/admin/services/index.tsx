import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, message } from 'antd';
import useServiceModel from '@/models/management/admin/services';

const ServiceManagement = () => {
 const { services, loading, fetchServices, addNewService, updateServiceData, deleteServiceData } = useServiceModel();
 const [isModalVisible, setIsModalVisible] = useState(false);
 const [editingService, setEditingService] = useState<any>(null);
 const [form] = Form.useForm();

 useEffect(() => {
   fetchServices();
 }, [fetchServices]);

 const handleAdd = () => {
  setEditingService(null);
  form.resetFields(); // reset lại form về trống
  setIsModalVisible(true);
};



 const handleEdit = (record: any) => {
  setEditingService(record);
  form.setFieldsValue({
    name: record.name,
    duration: record.duration,
    price: record.price
  });
  setIsModalVisible(true);
};


 const handleDelete = async (id: number) => {
   await deleteServiceData(id);
   message.success("Dịch vụ đã được xoá");
 };

 const handleOk = async () => {
  try {
    const values = await form.validateFields();
    if (editingService) {
      await updateServiceData(editingService.id, values); // ĐÚNG API từ model
      message.success("Cập nhật dịch vụ thành công");
    } else {
      await addNewService(values); // ĐÚNG API từ model
      message.success("Thêm dịch vụ thành công");
    }
    setIsModalVisible(false);
    fetchServices(); // Load lại danh sách dịch vụ
  } catch (error) {
    console.error("❌ Lỗi khi lưu dịch vụ:", error);
  }
};


 const columns = [
   { title: 'Tên dịch vụ', dataIndex: 'name', key: 'name' },
   { title: 'Thời gian (phút)', dataIndex: 'duration', key: 'duration' },
   { title: 'Giá (VND)', dataIndex: 'price', key: 'price' },
   { title: 'Hành động', key: 'action', render: (_: any, record: any) => (
     <>
       <Button onClick={() => handleEdit(record)}>Sửa</Button>
       <Button onClick={() => handleDelete(record.id)} danger>Xóa</Button>
     </>
   ) },
 ];

 return (
   <>
     <Button type="primary" onClick={handleAdd}>Thêm dịch vụ</Button>
     <Table columns={columns} dataSource={services} loading={loading} rowKey="id" />
     <Modal title={editingService ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ"} visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
     <Form form={form} layout="vertical">
      <Form.Item name="name" label="Tên dịch vụ" rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="duration" label="Thời gian (phút)" rules={[{ required: true, message: 'Vui lòng nhập thời gian' }]}>
        <InputNumber min={1} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="price" label="Giá (VND)" rules={[{ required: true, message: 'Vui lòng nhập giá' }]}>
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

    </Form>

     </Modal>
   </>
 );
};
export default ServiceManagement;
