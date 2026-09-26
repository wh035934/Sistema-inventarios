import { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Row, Col, message, Space } from 'antd';
import type { Entrega, EntregaForm } from '../data/mock';

interface Props {
  onAgregar: (valores: EntregaForm) => void;
  editing: Entrega | null;
  onActualizar: (id: number, valores: EntregaForm) => void;
  onCancelar: () => void;
}

const Formentregas = ({ onAgregar, editing, onActualizar, onCancelar }: Props) => {
  const [form] = Form.useForm<EntregaForm>();
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (editing) form.setFieldsValue(editing);
    else form.resetFields();
  }, [editing, form]);

  const onFinish = (values: EntregaForm) => {
    setGuardando(true);
    try {
      if (editing) {
        onActualizar(editing.id, values);
        message.success('Entrega actualizada');
      } else {
        onAgregar(values);
        form.resetFields();
        message.success('Entrega guardada');
      }
    } catch {
      message.error('No se pudo guardar la entrega');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Nombre entrega" name="nombre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Área" name="area" rules={[{ required: true }]}>
            <Select
              placeholder="Selecciona"
              options={[
                { value: 'sistemas', label: 'sistemas' },
                { value: 'marketing', label: 'marketing' },
                { value: 'administracion', label: 'administracion' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Estado" name="estado" rules={[{ required: true }]}>
            <Select
              placeholder="Selecciona"
              options={[
                { value: 'activa', label: 'Activa' },
                { value: 'urgente', label: 'Urgente' },
                { value: 'pausada', label: 'Pausada' },
                { value: 'cerrada', label: 'Cerrada' },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={guardando}>
            {editing ? 'Actualizar Entrega' : 'Agregar Entrega'}
          </Button>
          {editing && <Button onClick={() => { form.resetFields(); onCancelar(); }}>Cancelar</Button>}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default Formentregas;
