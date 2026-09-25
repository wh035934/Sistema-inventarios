import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Card, message } from 'antd';
import TablaEmpleados from './components/TablaEmpleados';
import Formempleado from './components/formempleado';
import TablaVacantes from './components/TablaVacantes';
import Formvacantes from './components/formvacantes';
import TablaInicio from './components/TablaInicio';
import Usuario from './components/Usuario';
import Menu from './components/Menu';
import {
  empleadosIniciales,
  vacantesIniciales,
  type Empleado,
  type EmpleadoForm,
  type Vacante,
  type VacanteForm,
} from './data/mock';
import './App.css';

function App() {
  const [empleados, setEmpleados] = useState<Empleado[]>(empleadosIniciales);
  const [vacantes, setVacantes] = useState<Vacante[]>(vacantesIniciales);
  const [editingEmpleado, setEditingEmpleado] = useState<Empleado | null>(null);
  const [editingVacante, setEditingVacante] = useState<Vacante | null>(null);

  const agregarEmpleado = (nuevoEmpleado: EmpleadoForm) => {
    const nuevo: Empleado = {
      ...nuevoEmpleado,
      edad: Number(nuevoEmpleado.edad),
      id: Date.now(),
    };
    setEmpleados((prev) => [...prev, nuevo]);
    message.success('Empleado agregado');
  };

  const eliminarEmpleado = (id: number) => {
    setEmpleados((prev) => prev.filter((e) => e.id !== id));
    message.success('Empleado eliminado');
  };

  const actualizarEmpleado = (id: number, valores: EmpleadoForm) => {
    const actualizado: Empleado = { ...valores, edad: Number(valores.edad), id };
    setEmpleados((prev) => prev.map((e) => (e.id === id ? actualizado : e)));
    setEditingEmpleado(null);
  };

  const agregarVacante = (nuevaVacante: VacanteForm) => {
    const nueva: Vacante = { ...nuevaVacante, id: Date.now() };
    setVacantes((prev) => [...prev, nueva]);
    message.success('Vacante agregada');
  };

  const eliminarVacante = (id: number) => {
    setVacantes((prev) => prev.filter((v) => v.id !== id));
    message.success('Vacante eliminada');
  };

  const actualizarVacante = (id: number, valores: VacanteForm) => {
    const actualizada: Vacante = { ...valores, id };
    setVacantes((prev) => prev.map((v) => (v.id === id ? actualizada : v)));
    setEditingVacante(null);
  };

  return (
    <div className="app-container">
      <Menu />
      <div className="contenido">
        <h1>Sistema de Gestión de Empleados</h1>
        <Routes>
          <Route path="/" element={<TablaInicio data={empleados} loading={false} />} />
          <Route
            path="/gestion"
            element={
              <>
                <Card title={editingEmpleado ? 'Editar empleado' : 'Agregar empleado'} style={{ marginBottom: 24 }}>
                  <Formempleado
                    onAgregar={agregarEmpleado}
                    editing={editingEmpleado}
                    onActualizar={actualizarEmpleado}
                    onCancelar={() => setEditingEmpleado(null)}
                  />
                </Card>
                <TablaEmpleados data={empleados} loading={false} onEliminar={eliminarEmpleado} onEditar={setEditingEmpleado} />
              </>
            }
          />
          <Route
            path="/vacantes"
            element={
              <>
                <Card title={editingVacante ? 'Editar vacante' : 'Agregar vacante'} style={{ marginBottom: 24 }}>
                  <Formvacantes
                    onAgregar={agregarVacante}
                    editing={editingVacante}
                    onActualizar={actualizarVacante}
                    onCancelar={() => setEditingVacante(null)}
                  />
                </Card>
                <TablaVacantes data={vacantes} loading={false} onEliminar={eliminarVacante} onEditar={setEditingVacante} />
              </>
            }
          />
          <Route path="/usuario" element={<Usuario />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
