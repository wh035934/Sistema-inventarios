import { Table, type TableColumnsType } from 'antd';
import type { Empleado } from '../data/mock';

const columns: TableColumnsType<Empleado> = [
  { title: 'Nombres', dataIndex: 'nombres', key: 'nombres' },
  { title: 'Apellidos', dataIndex: 'apellidos', key: 'apellidos' },
  { title: 'Edad', dataIndex: 'edad', key: 'edad' },
  { title: 'Area', dataIndex: 'area', key: 'area' },
  { title: 'Puesto', dataIndex: 'puesto', key: 'puesto' },
];

interface Props {
  data: Empleado[];
  loading: boolean;
}

const TablaInicio = ({ data, loading }: Props) => (
  <Table
    columns={columns}
    dataSource={data}
    rowKey="id"
    loading={loading}
    pagination={{ pageSize: 10 }}
  />
);
export default TablaInicio;
