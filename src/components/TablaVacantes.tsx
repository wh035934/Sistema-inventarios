import { Space, Table, Tag, Popconfirm, Button, type TableColumnsType } from 'antd';
import type { Vacante } from '../data/mock';

interface Props {
  data: Vacante[];
  loading: boolean;
  onEliminar: (id: number) => void;
  onEditar: (vacante: Vacante) => void;
}

const TablaVacantes = ({ data, loading, onEliminar, onEditar }: Props) => {
  const columns: TableColumnsType<Vacante> = [
    {
      title: 'Nombre de la Vacante',
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
            title="¿Eliminar vacante?"
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

export default TablaVacantes;
