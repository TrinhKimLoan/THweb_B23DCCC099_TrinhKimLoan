import { Button, Form, Input, InputNumber, Modal, Table, message } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';
import type { MonHoc } from '@/services/ManageQuestion/monhoc';


const MonHocPage = () => {
  const { data, add, update, remove } = useModel('managequestion.monhoc');
 
  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [row, setRow] = useState<MonHoc | null>(null);
  const [form] = Form.useForm();


  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tên Môn Học', dataIndex: 'name', key: 'name' },
    { title: 'Số Tín Chỉ', dataIndex: 'soTinChi', key: 'soTinChi' },
    {
      title: 'Hành động',
      key: 'action',
      render: (record: MonHoc) => (
        <div>
          <Button
            onClick={() => {
              setVisible(true);
              setRow(record);
              setIsEdit(true);
              form.setFieldsValue(record);
            }}
          >
            Sửa
          </Button>
          <Button style={{ marginLeft: 10 }} onClick={() => remove(record.id)} type='primary' danger>
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
          form.resetFields();
        }}
      >
        Thêm Môn Học
      </Button>


      <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} rowKey='id' />


      <Modal
        destroyOnClose
        footer={false}
        title={isEdit ? 'Chỉnh sửa Môn Học' : 'Thêm Môn Học'}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <Form
          form={form}
          onFinish={(values: { name: string; soTinChi: number }) => {
            const { name, soTinChi } = values;
            if (isEdit && row) {
              if (!update(row.id, name, soTinChi)) {
                message.error('Tên môn đã tồn tại!');
                return;
              }
            } else {
              if (!add(name, soTinChi)) {
                message.error('Tên môn đã tồn tại!');
                return;
              }
            }
            setVisible(false);
          }}
        >
          <Form.Item label='Tên Môn Học' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
            <Input />
          </Form.Item>
         
          <Form.Item
            label="Số Tín Chỉ"
            name="soTinChi"
            rules={[
                { required: true, message: "Vui lòng nhập số tín chỉ!" },
                () => ({
                validator(_, value) {
                    if (!value) return Promise.reject("Vui lòng nhập số tín chỉ!");
                    if (!Number.isInteger(value) || value <= 0) {
                    return Promise.reject("Số tín chỉ phải là số nguyên dương!");
                    }
                    return Promise.resolve();
                },
                }),
            ]}
            >
            <InputNumber min={1} step={1} />
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


export default MonHocPage;
