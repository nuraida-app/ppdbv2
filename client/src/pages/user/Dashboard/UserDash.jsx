import React from "react";
import { Card, Row, Col, Statistic, Table, Tag } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  DollarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import UserLayout from "../Layout/UserLayout";

const UserDash = () => {
  // Mock data based on database schema
  const mockPendaftar = {
    kode_pendaftaran: "PPDB-2024-001",
    status_pendaftaran: "Menunggu Verifikasi",
    nama: "John Doe",
    jenjang: "SMA",
    sekolah: "SMA Negeri 1",
    nisn: "1234567890",
  };

  const mockPembayaran = {
    status: "Belum Lunas",
    nominal: 1500000,
    tanggal: "2024-03-20",
  };

  const mockJadwal = [
    {
      key: "1",
      kegiatan: "Tes Akademik",
      waktu: "2024-04-01 08:00",
      status: "Belum Dimulai",
    },
    {
      key: "2",
      kegiatan: "Wawancara",
      waktu: "2024-04-02 10:00",
      status: "Belum Dimulai",
    },
  ];

  const jadwalColumns = [
    {
      title: "Kegiatan",
      dataIndex: "kegiatan",
      key: "kegiatan",
    },
    {
      title: "Waktu",
      dataIndex: "waktu",
      key: "waktu",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Selesai" ? "green" : "blue"}>{status}</Tag>
      ),
    },
  ];

  return (
    <UserLayout>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Status Pendaftaran"
              value={mockPendaftar.status_pendaftaran}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Kode Pendaftaran"
              value={mockPendaftar.kode_pendaftaran}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Status Pembayaran"
              value={mockPembayaran.status}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Progress Pendaftaran"
              value="50%"
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="Informasi Pendaftar">
            <p>
              <strong>Nama:</strong> {mockPendaftar.nama}
            </p>
            <p>
              <strong>Jenjang:</strong> {mockPendaftar.jenjang}
            </p>
            <p>
              <strong>Sekolah:</strong> {mockPendaftar.sekolah}
            </p>
            <p>
              <strong>NISN:</strong> {mockPendaftar.nisn}
            </p>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Jadwal Kegiatan">
            <Table
              dataSource={mockJadwal}
              columns={jadwalColumns}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </UserLayout>
  );
};

export default UserDash;
