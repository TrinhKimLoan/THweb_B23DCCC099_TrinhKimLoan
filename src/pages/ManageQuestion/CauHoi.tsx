import { Button, Card, Form, Input, Modal, Select, Tag, Pagination } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';
import type { CauHoi } from '@/models/managequestion/cauhoi';

const { Option } = Select;

const CauHoiPage = () => {
  const { data, add, update, remove } = useModel('managequestion.cauhoi');
  const { data: monHocData } = useModel('managequestion.monhoc');
  const { data: khoiKienThucData } = useModel('managequestion.khoikienthuc');

  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<CauHoi | null>(null);
  const [form] = Form.useForm();

  const [filterMonHoc, setFilterMonHoc] = useState<number | null>(null);
  const [filterMucDo, setFilterMucDo] = useState<string | null>(null);
  const [filterKhoiKienThuc, setFilterKhoiKienThuc] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const handleTagClick = (type: 'monHocId' | 'mucDo' | 'khoiKienThucId', value: any) => {
    if (type === 'monHocId') setFilterMonHoc(value);
    if (type === 'mucDo') setFilterMucDo(value);
    if (type === 'khoiKienThucId') setFilterKhoiKienThuc(value);
  };

  const filteredData = data.filter(q => 
    (!filterMonHoc || q.monHocId === filterMonHoc) &&
    (!filterMucDo || q.mucDo === filterMucDo) &&
    (!filterKhoiKienThuc || q.khoiKienThucId === filterKhoiKienThuc)
  );

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
          setIsEdit(false);
          form.resetFields();
        }}
      >
        Thêm Câu Hỏi
      </Button>

      {/* Thanh lọc câu hỏi */}
      <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
        <Select placeholder="Chọn Môn Học" onChange={setFilterMonHoc} allowClear>
          {monHocData.map(m => <Option key={m.id} value={m.id}>{m.name}</Option>)}
        </Select>
        <Select placeholder="Mức Độ" onChange={setFilterMucDo} allowClear>
          {['Dễ', 'Trung bình', 'Khó', 'Rất khó'].map(level => <Option key={level} value={level}>{level}</Option>)}
        </Select>
        <Select placeholder="Khối Kiến Thức" onChange={setFilterKhoiKienThuc} allowClear>
          {khoiKienThucData.map(k => <Option key={k.id} value={k.id}>{k.name}</Option>)}
        </Select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
        {filteredData.slice((page - 1) * pageSize, page * pageSize).map(cauHoi => (
          <Card
            key={cauHoi.id}
            title={monHocData.find(m => m.id === cauHoi.monHocId)?.name || 'Không xác định'}
            actions={[
              <Button onClick={() => { setIsEdit(true); setVisible(true); setSelectedQuestion(cauHoi); form.setFieldsValue(cauHoi); }}>Sửa</Button>,
              <Button danger onClick={() => remove(cauHoi.id)}>Xóa</Button>
            ]}
          >
            <div>
              <Tag onClick={() => handleTagClick('monHocId', cauHoi.monHocId)}>{monHocData.find(m => m.id === cauHoi.monHocId)?.name || 'Không xác định'}</Tag>
              <Tag onClick={() => handleTagClick('mucDo', cauHoi.mucDo)}>{cauHoi.mucDo}</Tag>
              <Tag onClick={() => handleTagClick('khoiKienThucId', cauHoi.khoiKienThucId)}>{khoiKienThucData.find(k => k.id === cauHoi.khoiKienThucId)?.name || 'Không xác định'}</Tag>
            </div>
            <p>{cauHoi.noiDung}</p>
          </Card>
        ))}
      </div>

      <Pagination current={page} pageSize={pageSize} total={filteredData.length} onChange={setPage} />

      <Modal visible={visible} title={isEdit ? 'Sửa Câu Hỏi' : 'Thêm Câu Hỏi'} onCancel={() => setVisible(false)} onOk={() => form.submit()}>
        <Form form={form} onFinish={(values) => {
          if (isEdit && selectedQuestion) update(selectedQuestion.id, values);
          else add(values);
          setVisible(false);
        }}>
          <Form.Item name="monHocId" label="Môn Học" rules={[{ required: true }]}>
            <Select>{monHocData.map(m => <Option key={m.id} value={m.id}>{m.name}</Option>)}</Select>
          </Form.Item>
          <Form.Item name="khoiKienThucId" label="Khối Kiến Thức" rules={[{ required: true }]}>
            <Select>{khoiKienThucData.map(k => <Option key={k.id} value={k.id}>{k.name}</Option>)}</Select>
          </Form.Item>
          <Form.Item name="mucDo" label="Mức Độ" rules={[{ required: true }]}>
            <Select>{['Dễ', 'Trung bình', 'Khó', 'Rất khó'].map(m => <Option key={m} value={m}>{m}</Option>)}</Select>
          </Form.Item>
          <Form.Item name="noiDung" label="Nội dung" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CauHoiPage;
