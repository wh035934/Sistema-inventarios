import { Space, Table, Tag, Popconfirm, Button, type TableColumnsType } from 'antd';
import type { Entrega } from '../data/mock';

interface Props {
  data: Entrega[];
  loading: boolean;
  onEliminar: (id: number) => void;
  onEditar: (entrega: Entrega) => void;
}

const TablaEntregas = ({ data, loading, onEliminar, onEditar }: Props) => {
  const columns: TableColumnsType<Entrega> = [
    {
      title: 'Nombre de la Entrega',
      dataIndex: 'nombre',
      key: 'nombre',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Área',
      dataIndex: 'area',
      key: 'area',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Estado',
      key: 'estado',
      dataIndex: 'estado',
      render: (estado: string) => {
        if (!estado) return null;
        let color = estado.length > 5 ? 'geekblue' : 'green';
        if (estado === 'urgente') {
          color = 'volcano';
        }
        return <Tag color={color}>{estado.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Accion',
      key: 'accion',
      render: (_, record) => (
        <Space size="medium">
          <Button type="link" onClick={() => onEditar(record)}>Edit</Button>
          <Popconfirm
            title="¿Eliminar entrega?"
            description="Esta acción la quita de la lista local."
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
    <Table columns={columns} dataSource={data} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} />
  );
};

export default TablaEntregas;
