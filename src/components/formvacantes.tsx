import { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Row, Col, message, Space } from 'antd';
import type { Vacante, VacanteForm } from '../data/mock';

interface Props {
  onAgregar: (valores: VacanteForm) => void;
  editing: Vacante | null;
  onActualizar: (id: number, valores: VacanteForm) => void;
  onCancelar: () => void;
}

const Formvacantes = ({ onAgregar, editing, onActualizar, onCancelar }: Props) => {
  const [form] = Form.useForm<VacanteForm>();
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (editing) form.setFieldsValue(editing);
    else form.resetFields();
  }, [editing, form]);

  const onFinish = (values: VacanteForm) => {
    setGuardando(true);
    try {
      if (editing) {
        onActualizar(editing.id, values);
        message.success('Vacante actualizada');
      } else {
        onAgregar(values);
        form.resetFields();
        message.success('Vacante guardada');
      }
    } catch {
      message.error('No se pudo guardar la vacante');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Nombre vacante" name="nombre" rules={[{ required: true }]}>
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
            {editing ? 'Actualizar Vacante' : 'Agregar Vacante'}
          </Button>
          {editing && <Button onClick={() => { form.resetFields(); onCancelar(); }}>Cancelar</Button>}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default Formvacantes;
