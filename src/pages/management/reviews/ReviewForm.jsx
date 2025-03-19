import { Form, Input, Rate, Button } from 'antd';

export default function ReviewForm({ appointmentId, onSubmit }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(appointmentId, values);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={handleFinish}>
      <Form.Item name="rating" label="Đánh giá" rules={[{ required: true }]}>
        <Rate />
      </Form.Item>
      <Form.Item name="comment" label="Nhận xét" rules={[{ required: true }]}>
        <Input.TextArea rows={3} />
      </Form.Item>
      <Button type="primary" htmlType="submit">Gửi đánh giá</Button>
    </Form>
  );
}
