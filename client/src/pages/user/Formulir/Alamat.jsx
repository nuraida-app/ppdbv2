import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Button,
  message,
} from "antd";
import { useAddAddressMutation } from "../../../controller/api/form/ApiForm";
import {
  useCitiesQuery,
  useDistrictsQuery,
  useProvincesQuery,
  useVillagesQuery,
} from "../../../controller/api/form/ApiArea";

const { Option } = Select;

const Alamat = ({ value, onChange, onSave }) => {
  const [form] = Form.useForm();
  const [provinceId, setProvinceId] = useState("default");
  const [cityId, setCityId] = useState("default");
  const [districtId, setDistrictId] = useState("default");
  const [villageId, setVillageId] = useState("default");
  const [initialized, setInitialized] = useState(false);

  const { data: provinces } = useProvincesQuery();
  const { data: cities } = useCitiesQuery(provinceId, {
    skip: provinceId === "default",
  });
  const { data: districts } = useDistrictsQuery(cityId, {
    skip: cityId === "default",
  });
  const { data: villages } = useVillagesQuery(districtId, {
    skip: districtId === "default",
  });

  const [addAddress, { isLoading }] = useAddAddressMutation();

  useEffect(() => {
    if (value && provinces && !initialized) {
      const provId =
        provinces.find((p) => p.nama === value.provinsi)?.id || "default";
      setProvinceId(provId);
    }
  }, [value, provinces, initialized]);

  useEffect(() => {
    if (provinceId !== "default" && value && cities && !initialized) {
      const city = cities.find((c) => c.nama === value.kota);
      setCityId(city ? city.id : "default");
    }
  }, [provinceId, value, cities, initialized]);

  useEffect(() => {
    if (cityId !== "default" && value && districts && !initialized) {
      const district = districts.find((d) => d.nama === value.kecamatan);
      setDistrictId(district ? district.id : "default");
    }
  }, [cityId, value, districts, initialized]);

  useEffect(() => {
    if (districtId !== "default" && value && villages && !initialized) {
      const village = villages.find((v) => v.nama === value.desa);
      setVillageId(village ? village.id : "default");
      form.setFieldsValue({
        provinsi: provinceId,
        kota: cityId,
        kecamatan: districtId,
        desa: village ? village.id : "default",
        alamat: value.alamat || "",
        kode_pos: value.kode_pos || "",
        jarak: value.jarak || "",
        transportasi: value.transportasi,
      });
      setInitialized(true);
    }
  }, [districtId, value, villages, initialized, form, provinceId, cityId]);

  useEffect(() => {
    if (value && initialized) {
      form.setFieldsValue({
        alamat: value.alamat || "",
        kode_pos: value.kode_pos || "",
        jarak: value.jarak || "",
        transportasi: value.transportasi,
      });
    }
  }, [value, form, initialized]);

  const handleProvinceChange = (val) => {
    setProvinceId(val);
    setCityId("default");
    setDistrictId("default");
    setVillageId("default");
    setInitialized(true);
    form.setFieldsValue({
      kota: undefined,
      kecamatan: undefined,
      desa: undefined,
    });
  };

  const handleCityChange = (val) => {
    setCityId(val);
    setDistrictId("default");
    setVillageId("default");
    setInitialized(true);
    form.setFieldsValue({ kecamatan: undefined, desa: undefined });
  };

  const handleDistrictChange = (val) => {
    setDistrictId(val);
    setVillageId("default");
    setInitialized(true);
    form.setFieldsValue({ desa: undefined });
  };

  const handleVillageChange = (val) => {
    setVillageId(val);
    setInitialized(true);
  };

  const handleSubmit = async (values) => {
    try {
      const formattedValues = {
        provinsi: provinces?.find((p) => p.id === provinceId)?.nama,
        kota: cities?.find((c) => c.id === cityId)?.nama,
        kecamatan: districts?.find((d) => d.id === districtId)?.nama,
        desa: villages?.find((v) => v.id === villageId)?.nama,
        alamat: values.alamat,
        kode_pos: values.kode_pos,
        jarak: values.jarak,
        transportasi: values.transportasi,
      };
      await addAddress(formattedValues).unwrap();
      message.success("Data alamat berhasil disimpan");
      onSave(formattedValues);
    } catch (error) {
      message.error("Gagal menyimpan data alamat");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={(_, allValues) => onChange(allValues)}
      onFinish={handleSubmit}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="alamat" label="Alamat Lengkap">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="provinsi" label="Provinsi">
            <Select
              placeholder="Pilih Provinsi"
              value={provinceId}
              onChange={handleProvinceChange}
            >
              {provinces?.map((province) => (
                <Option key={province.id} value={province.id}>
                  {province.nama}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="kota" label="Kota/Kabupaten">
            <Select
              placeholder="Pilih Kota/Kabupaten"
              value={cityId}
              onChange={handleCityChange}
              disabled={provinceId === "default" || !cities?.length}
            >
              {cities?.map((city) => (
                <Option key={city.id} value={city.id}>
                  {city.nama}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="kecamatan" label="Kecamatan">
            <Select
              placeholder="Pilih Kecamatan"
              value={districtId}
              onChange={handleDistrictChange}
              disabled={cityId === "default" || !districts?.length}
            >
              {districts?.map((district) => (
                <Option key={district.id} value={district.id}>
                  {district.nama}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="desa" label="Desa/Kelurahan">
            <Select
              placeholder="Pilih Desa/Kelurahan"
              value={villageId}
              onChange={handleVillageChange}
              disabled={districtId === "default" || !villages?.length}
            >
              {villages?.map((village) => (
                <Option key={village.id} value={village.id}>
                  {village.nama}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="kode_pos" label="Kode Pos">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="jarak" label="Jarak ke Sekolah (km)">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="transportasi" label="Transportasi ke Sekolah">
            <Select placeholder="Pilih Transportasi">
              <Option value="Mobil Pribadi">Mobil Pribadi</Option>
              <Option value="Motor">Motor</Option>
              <Option value="Angkutan Umum">Angkutan Umum</Option>
              <Option value="Jemputan">Jemputan</Option>
              <Option value="Jalan Kaki">Jalan Kaki</Option>
              <Option value="Sepeda">Sepeda</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Simpan
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Alamat;
