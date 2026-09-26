import { Space, Table, Tag, Popconfirm, Button, type TableColumnsType } from 'antd';
import type { Producto } from '../data/mock';

interface Props {
  data: Producto[];
  loading: boolean;
  onEliminar: (id: number) => void;
  onEditar: (producto: Producto) => void;
}

const TablaInventario = ({ data, loading, onEliminar, onEditar }: Props) => {
  const columns: TableColumnsType<Producto> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      render: (text: string) => <a>{text}</a>,
    },
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
    {
      title: 'Accion',
      key: 'accion',
      render: (_, record) => (
        <Space size="medium">
          <Button type="link" onClick={() => onEditar(record)}>Edit</Button>
          <Popconfirm
            title="¿Eliminar producto?"
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
      scroll={{ x: 'max-content' }}
    />
  );
};

export default TablaInventario;
