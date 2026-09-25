import { Space, Table, Popconfirm, Button, type TableColumnsType } from 'antd';
import type { Empleado } from '../data/mock';

interface Props {
  data: Empleado[];
  loading: boolean;
  onEliminar: (id: number) => void;
  onEditar: (empleado: Empleado) => void;
}

const TablaEmpleados = ({ data, loading, onEliminar, onEditar }: Props) => {
  const columns: TableColumnsType<Empleado> = [
    {
      title: 'Nombres',
      dataIndex: 'nombres',
      key: 'nombres',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Apellidos',
      dataIndex: 'apellidos',
      key: 'apellidos',
    },
    {
      title: 'Edad',
      dataIndex: 'edad',
      key: 'edad',
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Puesto',
      dataIndex: 'puesto',
      key: 'puesto',
    },
    {
      title: 'Accion',
      key: 'accion',
      render: (_, record) => (
        <Space size="medium">
          <Button type="link" onClick={() => onEditar(record)}>Edit</Button>
          <Popconfirm
            title="¿Eliminar empleado?"
            description="Esta acción lo quita de la lista local."
            onConfirm={() => onEliminar(record.id)}
            okText="Sí"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default TablaEmpleados;
