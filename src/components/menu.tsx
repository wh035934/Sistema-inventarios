import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DesktopOutlined,
  HistoryOutlined,
  ApartmentOutlined,
  UserOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Menu as AntMenu } from 'antd';

const items = [
  { key: '/', icon: <HomeOutlined />, label: 'Inicio' },
  { key: '/gestion', icon: <ApartmentOutlined />, label: 'Gestion' },
  { key: '/entregas', icon: <DesktopOutlined />, label: 'Entrega' },
  { key: '/movimientos', icon: <HistoryOutlined />, label: 'Movimientos' },
  { key: '/usuario', icon: <UserOutlined />, label: 'Usuario' },
];

const Menu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <div
      style={{
        width: collapsed ? 80 : 256,
        minHeight: '100vh',
        backgroundColor: '#001529',
        transition: 'width 0.2s',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          padding: '16px',
        }}
      >
        {!collapsed && (
          <h2 style={{ color: 'white', margin: 0 }}>Menú</h2>
        )}
        <Button type="primary" onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>

      <AntMenu
        selectedKeys={[location.pathname]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleClick}
      />
    </div>
  );
};

export default Menu;
