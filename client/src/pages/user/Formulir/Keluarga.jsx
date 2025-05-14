import React from "react";
import {
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Button,
  message,
  Table,
  Space,
} from "antd";
import {
  useGetFamilyFormQuery,
  useAddFamilyMutation,
  useDeleteFamilyMutation,
} from "../../../controller/api/form/ApiForm";
import { useSelector } from "react-redux";

const Keluarga = ({ value, onChange, onSave }) => {
  const [form] = Form.useForm();

  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  const { data: families, isLoading: isLoadingFamilies } =
    useGetFamilyFormQuery(userId, {
      skip: !userId,
    });
  const [addFamily, { isLoading: isAdding }] = useAddFamilyMutation();
  const [deleteFamily, { isLoading: isDeleting }] = useDeleteFamilyMutation();

  const handleSubmit = async (values) => {
    try {
      await addFamily(values).unwrap();
      message.success("Data keluarga berhasil ditambahkan");
      form.resetFields();
    } catch (error) {
      message.error("Gagal menambahkan data keluarga");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFamily(id).unwrap();
      message.success("Data keluarga berhasil dihapus");
    } catch (error) {
      message.error("Gagal menghapus data keluarga");
    }
  };

  const columns = [
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Tanggal Lahir",
      dataIndex: "tanggal_lahir",
      key: "tanggal_lahir",
      render: (date) => new Date(date).toLocaleDateString("id-ID"),
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record.id)}
            loading={isDeleting}
          >
            Hapus
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="nama"
              label="Nama Anggota Keluarga"
              rules={[{ required: true, message: "Nama harus diisi" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="tgl"
              label="Tanggal Lahir"
              rules={[{ required: true, message: "Tanggal lahir harus diisi" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isAdding}>
            Tambah
          </Button>
        </Form.Item>
      </Form>

      <Table
        columns={columns}
        dataSource={families}
        loading={isLoadingFamilies}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

export default Keluarga;
