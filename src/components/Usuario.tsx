import { useState } from 'react';
import { Card, Table, Button, Space, Tag, Popconfirm, message, type TableColumnsType } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface UsuarioRow {
  key: string;
  nombre: string;
  correo: string;
  rol: string;
  fecha: string;
}

const columnsBase: TableColumnsType<UsuarioRow> = [
  { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
  { title: 'Correo', dataIndex: 'correo', key: 'correo' },
  {
    title: 'Rol',
    dataIndex: 'rol',
    key: 'rol',
    render: (rol: string) => (
      <Tag color={rol === 'Administrador' ? 'blue' : 'green'}>{rol}</Tag>
    ),
  },
  { title: 'Fecha de Creación', dataIndex: 'fecha', key: 'fecha' },
];

const Usuario = () => {
  const [usuarios, setUsuarios] = useState<UsuarioRow[]>([
    { key: '1', nombre: 'Juan Pérez', correo: 'juan.perez@example.com', rol: 'Administrador', fecha: '05/08/2023' },
    { key: '2', nombre: 'Maria Lopez', correo: 'maria.lopez@example.com', rol: 'Empleado', fecha: '12/03/2023' },
    { key: '3', nombre: 'Carlos Sanchez', correo: 'carlos.sanchez@example.com', rol: 'Empleado', fecha: '18/01/2023' },
  ]);

  const eliminarUsuario = (key: string) => {
    setUsuarios((prev) => prev.filter((u) => u.key !== key));
    message.success('Usuario eliminado');
  };

  const columns: TableColumnsType<UsuarioRow> = [
    ...columnsBase,
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="¿Eliminar usuario?"
            description="Esta acción lo quita de la lista local."
            onConfirm={() => eliminarUsuario(record.key)}
            okText="Sí"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Gestión de Usuarios">
      <Table columns={columns} dataSource={usuarios} rowKey="key" pagination={{ pageSize: 10 }} />
    </Card>
  );
};

export default Usuario;
