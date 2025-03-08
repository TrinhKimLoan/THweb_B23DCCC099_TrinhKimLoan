import { Button, Form, Input, Modal, Table, message } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';
import type { KhoiKienThuc } from '@/services/ManageQuestion/khoikienthuc'; // Đúng


const KhoiKienThucPage = () => {
  // Gán kiểu dữ liệu cho `useModel()`
  const { data, add, update, remove } = useModel('managequestion.khoikienthuc');
 
  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [row, setRow] = useState<KhoiKienThuc | null>(null);
  const [form] = Form.useForm(); // 🔹 Khai báo form


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên Khối Kiến Thức',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (record: KhoiKienThuc) => (
        <div>
          <Button
            onClick={() => {
              setVisible(true);
              setRow(record);
              setIsEdit(true);
              form.setFieldsValue(record); // 🛠 Đổ dữ liệu vào form
            }}
          >
            Sửa
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            onClick={() => remove(record.id)}
            type='primary'
            danger
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];


  return (
    <div>
      <Button
        type='primary'
        onClick={() => {
          setVisible(true);
          setIsEdit(false);
          form.resetFields(); // 🛠 Reset form khi thêm mới
        }}
      >
        Thêm Khối Kiến Thức
      </Button>


      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 5 }} // 🔹 Thêm phân trang
        rowKey="id" // 🔹 Định danh row tránh lỗi React
      />


      <Modal
        destroyOnClose
        footer={false}
        title={isEdit ? 'Chỉnh sửa Khối Kiến Thức' : 'Thêm Khối Kiến Thức'}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
       
        <Form
          form={form}
          onFinish={(values: { name: string }) => {
            if (isEdit && row) {
              update(row.id, values.name);
              setVisible(false);
            } else {
              const success = add(values.name);
              if (!success) {
                message.error('Tên khối kiến thức đã tồn tại!'); // Hiển thị cảnh báo
                return;
              }
              setVisible(false);
            }
          }}
        >


          <Form.Item
            label='Tên Khối Kiến Thức'
            name='name'
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input />
          </Form.Item>
          <div className='form-footer'>
            <Button htmlType='submit' type='primary'>
              {isEdit ? 'Lưu' : 'Thêm'}
            </Button>
            <Button onClick={() => setVisible(false)}>Hủy</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};


export default KhoiKienThucPage;
