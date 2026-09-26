import { Table, Tag, type TableColumnsType } from 'antd';
import type { Producto } from '../data/mock';

const columns: TableColumnsType<Producto> = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
  { title: 'Modelo', dataIndex: 'modelo', key: 'modelo' },
  { title: 'Categoría', dataIndex: 'categoria', key: 'categoria' },
  { title: 'Ubicación', dataIndex: 'ubicacion', key: 'ubicacion' },
  { title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad' },
  {
    title: 'Estado',
    dataIndex: 'estado',
    key: 'estado',
    render: (estado: string) => {
      let color = 'green';
      if (estado === 'danado') color = 'volcano';
      if (estado === 'en reparacion') color = 'orange';
      return <Tag color={color}>{estado.toUpperCase()}</Tag>;
    },
  },
  { title: 'Fecha de registro', dataIndex: 'fechaRegistro', key: 'fechaRegistro' },
  {
    title: 'Precio',
    dataIndex: 'precio',
    key: 'precio',
    render: (precio: number) => `$${Number(precio).toFixed(2)}`,
  },
  { title: 'Descripción', dataIndex: 'descripcion', key: 'descripcion' },
];

interface Props {
  data: Producto[];
  loading: boolean;
}

const TablaInicio = ({ data, loading }: Props) => (
  <Table
    columns={columns}
    dataSource={data}
    rowKey="id"
    loading={loading}
    pagination={{ pageSize: 10 }}
    scroll={{ x: 'max-content' }}
  />
);
export default TablaInicio;
