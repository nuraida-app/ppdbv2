import React from "react";
import { Card, Form, Radio, Button, message, Space, Typography } from "antd";
import UserLayout from "../Layout/UserLayout";

const { Title } = Typography;

const Kuisioner = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Questionnaire values:", values);
    message.success("Kuisioner berhasil disimpan!");
  };

  const questions = [
    {
      id: 1,
      question: "Apakah Anda memiliki akses internet di rumah?",
      options: ["Ya", "Tidak"],
    },
    {
      id: 2,
      question: "Apakah Anda memiliki perangkat untuk pembelajaran online?",
      options: ["Ya", "Tidak"],
    },
    {
      id: 3,
      question: "Bagaimana kondisi ekonomi keluarga Anda?",
      options: ["Sangat Baik", "Baik", "Cukup", "Kurang"],
    },
    {
      id: 4,
      question: "Apakah Anda memiliki prestasi akademik?",
      options: ["Ya", "Tidak"],
    },
    {
      id: 5,
      question: "Apakah Anda aktif dalam kegiatan ekstrakurikuler?",
      options: ["Ya", "Tidak"],
    },
  ];

  return (
    <UserLayout>
      <Card title="Kuisioner Pendaftaran">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {questions.map((q) => (
            <Form.Item
              key={q.id}
              name={`question_${q.id}`}
              label={q.question}
              rules={[
                { required: true, message: "Pertanyaan ini harus dijawab!" },
              ]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  {q.options.map((option) => (
                    <Radio key={option} value={option}>
                      {option}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>
          ))}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Kirim Kuisioner
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </UserLayout>
  );
};

export default Kuisioner;
