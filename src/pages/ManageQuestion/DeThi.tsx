import { Button, Form, Input, InputNumber, Modal, Select, Tag, message, Table, Popconfirm } from 'antd';
import { useState, useEffect } from 'react';
import { useModel } from 'umi';
import type { DeThi, CauTrucDeThi } from '@/models/managequestion/dethi';

const { Option } = Select;

const DeThiPage = () => {
  
  const { data: monHocData } = useModel('managequestion.monhoc');
  const { data: khoiKienThucData } = useModel('managequestion.khoikienthuc');
  const { data: cauHoiData } = useModel('managequestion.cauhoi');
  const {
    cauTrucDeThi,
    addDeThi,
    addCauTruc,
    removeCauTruc,
    updateDeThi,
    removeDeThi
  } = useModel('managequestion.dethi');
  const { data: deThiList } = useModel('managequestion.dethi');

  // Thêm state mới cho xem chi tiết cấu trúc
  const [viewingCauTruc, setViewingCauTruc] = useState<CauTrucDeThi | null>(null);
  const [selectedCauTruc, setSelectedCauTruc] = useState<number | null>(null);
  const [cauHoiYeuCau, setCauHoiYeuCau] = useState<{ soLuong: number; mucDo: string; khoiKienThucId: number; khoiKienThucName: string }[]>([]);
  const [visibleLuuCauTruc, setVisibleLuuCauTruc] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  
  const [selectedDeThi, setSelectedDeThi] = useState<DeThi | null>(null);
  const [editingDeThi, setEditingDeThi] = useState<DeThi | null>(null);
  const [requirementForm] = Form.useForm();

  const xemDeThi = (deThi: DeThi) => {
        setSelectedDeThi(deThi);
      };

  const handleSaveDeThi = (values: any) => {
      // Lấy thông tin cấu trúc
      const selectedCauTrucObj = selectedCauTruc 
      ? cauTrucDeThi.find(c => c.id === selectedCauTruc)
      : null;

    // Tạo cấu trúc tạm thời
    const tempCauTruc = selectedCauTrucObj || {
      id: -1,
      name: values.cauTrucName,
      cauHoiYeuCau: cauHoiYeuCau.map(({ khoiKienThucName, ...rest }) => rest)
    };

    // Validate
    if (!tempCauTruc?.cauHoiYeuCau?.length) {
      message.error('Vui lòng chọn/nhập đầy đủ thông tin cấu trúc!');
      return;
    }
    // Hàm xáo trộn mảng và chọn câu hỏi không trùng lặp
    const localGenerateDeThi  = (monHocId: number, cauTruc: any, cauHoiList: any[]) => {
      const selectedIds = new Set<number>();
      
      for (const yeuCau of cauTruc.cauHoiYeuCau) {
        const eligibleQuestions = cauHoiList
          .filter(q => 
            q.monHocId === monHocId &&
            q.mucDo === yeuCau.mucDo &&
            q.khoiKienThucId === yeuCau.khoiKienThucId &&
            !selectedIds.has(q.id)
          );
        
        // Xáo trộn câu hỏi
        const shuffled = [...eligibleQuestions].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, yeuCau.soLuong);
        
        if (selected.length < yeuCau.soLuong) return [];
        
        selected.forEach(q => selectedIds.add(q.id));
      }
      
      return Array.from(selectedIds);
    };
    // Generate đề thi
    const cauHoiIds = localGenerateDeThi(
      values.monHocId,
      tempCauTruc,
      cauHoiData
    );
 ////////
    if (!tempCauTruc || cauHoiYeuCau.length === 0) {
      message.error('Vui lòng nhập đầy đủ thông tin cấu trúc!');
      return;
    }
      
    if (cauHoiIds.length === 0) {
      message.error('Không đủ câu hỏi để tạo đề!');
      return;
    }

    const newDeThi = {
      name: values.name,
      monHocId: values.monHocId,
      cauHoiIds
    };

    addDeThi(newDeThi);
    
    // Hiển thị đề thi vừa tạo
    const latestDeThi = deThiList[deThiList.length - 1];
    setSelectedDeThi(latestDeThi);
    
    if (!selectedCauTruc) {
      setVisibleLuuCauTruc(true);
    } else {
      setVisible(false);
    }
  };
  useEffect(() => {
    if (selectedCauTruc) {
      const cauTruc = cauTrucDeThi.find(c => c.id === selectedCauTruc);
      if (cauTruc) {
        form.setFieldsValue({
          cauTrucName: cauTruc.name
        });
      }
    }
  }, [selectedCauTruc]);
  const handleSaveCauTruc = () => {
    // Gọi service addCauTrucDeThi (đã có logic tạo ID)
    addCauTruc({
      name: form.getFieldValue('cauTrucName'),
      cauHoiYeuCau: cauHoiYeuCau.map(({ khoiKienThucName, ...rest }) => rest)
    });

    message.success('Đã lưu cấu trúc đề thi');
    setVisibleLuuCauTruc(false);
    setVisible(false);
  };
  
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
          form.resetFields();
          setSelectedCauTruc(null);
          setCauHoiYeuCau([]);
        }}
      >
        Tạo Đề Thi
      </Button>
        {/* Danh sách cấu trúc đề thi */}
        <Table
          style={{ marginTop: 20 }}
          dataSource={cauTrucDeThi}
          columns={[
            { title: 'Tên Cấu Trúc', dataIndex: 'name', key: 'name' },
            {
              title: 'Hành động',
              key: 'action',
              render: (_, record) => (
                <div>
                  <Button onClick={() => setViewingCauTruc(record)}>Xem</Button>
                  <Popconfirm
                    title="Bạn có chắc chắn muốn xóa?"
                    onConfirm={() => removeCauTruc(record.id)}
                  >
                    <Button danger>Xóa</Button>
                  </Popconfirm>
                </div>
              )
            }
          ]}
          rowKey="id"
        />

        {/* Danh sách đề thi */}
        <Table
          style={{ marginTop: 20 }}
          dataSource={deThiList}
          columns={[
            { title: 'Tên Đề Thi', dataIndex: 'name', key: 'name' },
            {
              title: 'Môn Học',
              dataIndex: 'monHocId',
              render: monHocId => monHocData.find(m => m.id === monHocId)?.name
            },
            {
              title: 'Hành động',
              key: 'action',
              render: (_, record) => (
                <div>
                  <Button onClick={() => xemDeThi(record)}>Xem</Button>
                  <Button onClick={() => setEditingDeThi(record)}>Sửa</Button>
                  <Popconfirm
                    title="Bạn có chắc chắn muốn xóa?"
                    onConfirm={() => removeDeThi(record.id)}
                  >
                    <Button danger>Xóa</Button>
                  </Popconfirm>
                </div>
              )
            }
          ]}
          rowKey="id"
        />
        
        {/* Modal sửa đề thi */}
        <Modal
          visible={!!editingDeThi}
          title="Chỉnh sửa đề thi"
          onCancel={() => setEditingDeThi(null)}
          onOk={() => {
            updateDeThi(editingDeThi!.id, {
              name: editingDeThi!.name,
              cauHoiIds: editingDeThi!.cauHoiIds
            });
            setEditingDeThi(null);
          }}
        >
          <Form layout="vertical">
            <Form.Item label="Tên đề thi">
              <Input 
                value={editingDeThi?.name} 
                onChange={e => setEditingDeThi({...editingDeThi!, name: e.target.value})}
              />
            </Form.Item>
            <Form.Item label="Câu hỏi">
              <Select
                mode="multiple"
                value={editingDeThi?.cauHoiIds}
                onChange={value => setEditingDeThi({...editingDeThi!, cauHoiIds: value})}
                style={{ width: '100%' }}
              >
                {cauHoiData.map(q => (
                  <Option key={q.id} value={q.id}>
                    {q.noiDung} ({q.mucDo})
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        {/* Modal tạo đề thi */}
        <Modal
          visible={visible}
          title="Tạo Đề Thi"
          onCancel={() => setVisible(false)}
          onOk={() => form.submit()}
        >
          <Form form={form} onFinish={handleSaveDeThi}>

            <Form.Item name="name" label="Tên Đề Thi" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="monHocId" label="Môn Học" rules={[{ required: true }]}><Select>{monHocData.map(m => <Option key={m.id} value={m.id}>{m.name}</Option>)}</Select></Form.Item>
            <Form.Item label="Cấu Trúc Đề Thi">
            <Select
              onChange={(value: number) => { // Thêm kiểu dữ liệu rõ ràng
                // Đổi tên biến để tránh xung đột
                const selectedStructure = cauTrucDeThi.find(c => c.id === value);
                
                if (selectedStructure) {
                  // Cập nhật danh sách yêu cầu câu hỏi
                  setCauHoiYeuCau(
                    selectedStructure.cauHoiYeuCau.map(yc => ({
                      ...yc,
                      khoiKienThucName: khoiKienThucData.find(k => k.id === yc.khoiKienThucId)?.name || 'Không xác định'
                    }))
                  );
                } else {
                  // Reset nếu không chọn cấu trúc
                  setCauHoiYeuCau([]);
                }
                
                // Cập nhật state và form
                setSelectedCauTruc(value);
                form.setFieldsValue({ cauTrucName: selectedStructure?.name || '' });
              }}
              allowClear
            >
              {cauTrucDeThi.map(c => (
                <Option 
                  key={c.id} 
                  value={c.id} // Đảm bảo value là number
                >
                  {c.name}
                </Option>
              ))}
            </Select>
            </Form.Item>
            {!selectedCauTruc && (
              <Form.Item name="cauTrucName" label="Tên Cấu Trúc Mới" rules={[{ required: !selectedCauTruc }]}><Input /></Form.Item>
            )}



            <Form form={requirementForm} layout="inline" style={{ marginBottom: 16 }}>
              <Form.Item name="soLuong" rules={[{ required: true, type: 'number', min: 1 }]}><InputNumber min={1} placeholder="Số câu" /></Form.Item>
              <Form.Item name="mucDo" rules={[{ required: true }]}><Select placeholder="Mức Độ">{['Dễ', 'Trung bình', 'Khó', 'Rất khó'].map(level => <Option key={level} value={level}>{level}</Option>)}</Select></Form.Item>
              <Form.Item name="khoiKienThucId" rules={[{ required: true }]}><Select placeholder="Khối Kiến Thức" onChange={(value) => {
                const selectedKhoi = khoiKienThucData.find(k => k.id === value);
                requirementForm.setFieldsValue({ khoiKienThucName: selectedKhoi ? selectedKhoi.name : '' });
              }}>{khoiKienThucData.map(k => <Option key={k.id} value={k.id}>{k.name}</Option>)}</Select></Form.Item>
              <Button onClick={() => {
                requirementForm.validateFields().then(values => {
                  setCauHoiYeuCau([...cauHoiYeuCau, {
                    ...values,
                    khoiKienThucName: requirementForm.getFieldValue('khoiKienThucName')
                  }]);
                  requirementForm.resetFields();
                }).catch(() => {
                  message.error('Vui lòng nhập đầy đủ thông tin!');
                });
              }}>Thêm</Button>
            </Form>

            <div style={{ marginTop: 10 }}>
              {cauHoiYeuCau.map((item, index) => (
                <Tag key={index} closable onClose={() => setCauHoiYeuCau(cauHoiYeuCau.filter((_, i) => i !== index))}>
                  {item.soLuong} {item.mucDo} {item.khoiKienThucName}
                </Tag>
              ))}
            </div>
          </Form>
        </Modal>


        {/* Popup hỏi lưu cấu trúc */}
        <Modal
          visible={visibleLuuCauTruc}
          title="Lưu cấu trúc đề thi"
          onOk={() => {
            handleSaveCauTruc();
            setVisible(false);
          }}
          onCancel={() => {
            setVisibleLuuCauTruc(false);
            setVisible(false);
          }}
        >
          <p>Bạn có muốn lưu lại cấu trúc đề thi này không?</p>
        </Modal>
      {/* Modal xem đề thi */}
      <Modal
        visible={!!selectedDeThi}
        title={selectedDeThi?.name}
        onCancel={() => setSelectedDeThi(null)}
        footer={[
          <Button key="back" onClick={() => setSelectedDeThi(null)}>
            Đóng
          </Button>,
          
        ]}
      >
        <p><strong>Môn học:</strong> {monHocData.find(m => m.id === selectedDeThi?.monHocId)?.name}</p>
        <p><strong>Câu hỏi:</strong></p>
        <ol>
          {selectedDeThi?.cauHoiIds.map((id, index) => {
            const cauHoi = cauHoiData.find(q => q.id === id);
            return (
              <li key={id}>
                {index + 1}. {cauHoi?.noiDung || 'Câu hỏi không tồn tại'}
                <br />
                <small>Mức độ: {cauHoi?.mucDo}</small>
              </li>
            );
          })}
        </ol>
      </Modal>
      {/* Modal xem cấu trúc */}
      <Modal
        visible={!!viewingCauTruc}
        title={viewingCauTruc?.name}
        onCancel={() => setViewingCauTruc(null)}
        footer={null}
      >
        <h3>Yêu cầu câu hỏi:</h3>
        <ul>
        {viewingCauTruc?.cauHoiYeuCau.map((yc: { soLuong: number; mucDo: string; khoiKienThucId: number }, index: number) => (
          <li key={index}>
            {yc.soLuong} câu {yc.mucDo} - Khối kiến thức: {
              khoiKienThucData.find(k => k.id === yc.khoiKienThucId)?.name
            }
          </li>
        ))}
        </ul>
      </Modal>
      
    </div>
  );
};

export default DeThiPage;