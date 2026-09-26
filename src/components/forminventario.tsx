import { useState, useEffect } from 'react';
import { Button, Form, Input, InputNumber, Select, Row, Col, message, Space } from 'antd';
import type { Producto, ProductoForm } from '../data/mock';

interface Props {
  onAgregar: (valores: ProductoForm) => void;
  editing: Producto | null;
  onActualizar: (id: number, valores: ProductoForm) => void;
  onCancelar: () => void;
}

const Forminventario = ({ onAgregar, editing, onActualizar, onCancelar }: Props) => {
  const [form] = Form.useForm<ProductoForm>();
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (editing) form.setFieldsValue(editing);
    else form.resetFields();
  }, [editing, form]);

  const onFinish = (values: ProductoForm) => {
    setGuardando(true);
    try {
      const normalizados: ProductoForm = {
        ...values,
        cantidad: Number(values.cantidad),
        precio: Number(values.precio),
      };
      if (editing) {
        onActualizar(editing.id, normalizados);
        message.success('Producto actualizado');
      } else {
        onAgregar(normalizados);
        form.resetFields();
        message.success('Producto guardado');
      }
    } catch {
      message.error('No se pudo guardar el producto');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Nombre" name="nombre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Modelo" name="modelo" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Categoría" name="categoria" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Ubicación" name="ubicacion" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Cantidad" name="cantidad" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Estado" name="estado" rules={[{ required: true }]}>
            <Select
              placeholder="Selecciona"
              options={[
                { value: 'disponible', label: 'Disponible' },
                { value: 'danado', label: 'Dañado' },
                { value: 'en reparacion', label: 'En reparación' },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Fecha de registro" name="fechaRegistro" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Precio" name="precio" rules={[{ required: true }]}>
            <InputNumber min={0} step={0.01} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Descripción" name="descripcion" rules={[{ required: true }]}>
            <Input.TextArea rows={1} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={guardando}>
            {editing ? 'Actualizar Producto' : 'Agregar Producto'}
          </Button>
          {editing && <Button onClick={() => { form.resetFields(); onCancelar(); }}>Cancelar</Button>}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default Forminventario;
