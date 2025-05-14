import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  InputNumber,
  Upload,
  Button,
  message,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const PaymentForm = ({ user }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = (values) => {
    console.log("Form values:", values);
    console.log("File:", fileList);
    message.success("Data pembayaran berhasil disimpan!");
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Card title="Form Pembayaran">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          nama: user?.nama,
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="nama"
              label="Nama Calon Siswa"
              rules={[{ required: true, message: "Nama harus diisi!" }]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="nominal"
              label="Nominal Pembayaran"
              rules={[{ required: true, message: "Nominal harus diisi!" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) =>
                  `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\Rp\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="media"
              label="Media Pembayaran"
              rules={[
                { required: true, message: "Media pembayaran harus diisi!" },
              ]}
            >
              <Input placeholder="Contoh: Transfer Bank BCA" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="upload"
              label="Upload Bukti Pembayaran"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                {
                  required: true,
                  message: "Bukti pembayaran harus diupload!",
                },
              ]}
            >
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
                onChange={({ fileList }) => setFileList(fileList)}
              >
                <Button icon={<UploadOutlined />}>
                  Upload Bukti Pembayaran
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Simpan Pembayaran
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PaymentForm;
