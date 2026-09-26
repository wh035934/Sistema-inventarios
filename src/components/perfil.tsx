import { Avatar, Tag, Descriptions } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { UsuarioRow } from './usuario';

interface Props {
  usuario: UsuarioRow | null;
}

const Perfil = ({ usuario }: Props) => {
  if (!usuario) return <p>No hay usuario seleccionado.</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <Avatar size={80} icon={<UserOutlined />} />
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ margin: 0 }}>{usuario.nombre}</h2>
        <p style={{ margin: 0, color: '#888' }}>{usuario.rol}</p>
        <Tag color="green" style={{ marginTop: 8 }}>En línea</Tag>
      </div>
      <Descriptions bordered column={1} style={{ width: '100%' }}>
        <Descriptions.Item label="Nombre">{usuario.nombre}</Descriptions.Item>
        <Descriptions.Item label="Correo">{usuario.correo}</Descriptions.Item>
        <Descriptions.Item label="Rol">
          <Tag color={usuario.rol === 'Administrador' ? 'blue' : 'green'}>{usuario.rol}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Fecha de Creación">{usuario.fecha}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Perfil;
