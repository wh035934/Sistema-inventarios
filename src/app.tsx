import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Card, message } from 'antd';
import TablaInventario from './components/tablainventario';
import Forminventario from './components/forminventario';
import TablaEntregas from './components/tablaentregas';
import Formentregas from './components/formentregas';
import TablaInicio from './components/tablainicio';
import Usuario from './components/usuario';
import Menu from './components/menu';
import Movimientos from './components/movimientos';
import {
  inventarioInicial,
  entregasIniciales,
  type Producto,
  type ProductoForm,
  type Entrega,
  type EntregaForm,
} from './data/mock';
import './app.css';

function App() {
  const [productos, setProductos] = useState<Producto[]>(inventarioInicial);
  const [entregas, setEntregas] = useState<Entrega[]>(entregasIniciales);
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);
  const [editingEntrega, setEditingEntrega] = useState<Entrega | null>(null);

  const agregarProducto = (nuevoProducto: ProductoForm) => {
    const nuevo: Producto = {
      ...nuevoProducto,
      cantidad: Number(nuevoProducto.cantidad),
      precio: Number(nuevoProducto.precio),
      id: Date.now(),
    };
    setProductos((prev) => [...prev, nuevo]);
    message.success('Producto agregado');
  };

  const eliminarProducto = (id: number) => {
    setProductos((prev) => prev.filter((e) => e.id !== id));
    message.success('Producto eliminado');
  };

  const actualizarProducto = (id: number, valores: ProductoForm) => {
    const actualizado: Producto = {
      ...valores,
      cantidad: Number(valores.cantidad),
      precio: Number(valores.precio),
      id,
    };
    setProductos((prev) => prev.map((e) => (e.id === id ? actualizado : e)));
    setEditingProducto(null);
  };

  const agregarEntrega = (nuevaEntrega: EntregaForm) => {
    const nueva: Entrega = { ...nuevaEntrega, id: Date.now() };
    setEntregas((prev) => [...prev, nueva]);
    message.success('Entrega agregada');
  };

  const eliminarEntrega = (id: number) => {
    setEntregas((prev) => prev.filter((v) => v.id !== id));
    message.success('Entrega eliminada');
  };

  const actualizarEntrega = (id: number, valores: EntregaForm) => {
    const actualizada: Entrega = { ...valores, id };
    setEntregas((prev) => prev.map((v) => (v.id === id ? actualizada : v)));
    setEditingEntrega(null);
  };

  return (
    <div className="app-container">
      <Menu />
      <div className="contenido">
        <h1>Sistema de Inventario</h1>
        <Routes>
          <Route path="/" element={<TablaInicio data={productos} loading={false} />} />
          <Route
            path="/gestion"
            element={
              <>
                <Card title={editingProducto ? 'Editar producto' : 'Agregar producto'} style={{ marginBottom: 24 }}>
                  <Forminventario
                    onAgregar={agregarProducto}
                    editing={editingProducto}
                    onActualizar={actualizarProducto}
                    onCancelar={() => setEditingProducto(null)}
                  />
                </Card>
                <TablaInventario data={productos} loading={false} onEliminar={eliminarProducto} onEditar={setEditingProducto} />
              </>
            }
          />
          <Route
            path="/entregas"
            element={
              <>
                <Card title={editingEntrega ? 'Editar entrega' : 'Agregar entrega'} style={{ marginBottom: 24 }}>
                  <Formentregas
                    onAgregar={agregarEntrega}
                    editing={editingEntrega}
                    onActualizar={actualizarEntrega}
                    onCancelar={() => setEditingEntrega(null)}
                  />
                </Card>
                <TablaEntregas data={entregas} loading={false} onEliminar={eliminarEntrega} onEditar={setEditingEntrega} />
              </>
            }
          />
          <Route path="/movimientos" element={<Movimientos />} />
          <Route path="/usuario" element={<Usuario />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
