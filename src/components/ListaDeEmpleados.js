import React, { useState, useEffect } from 'react';

import EmpleadoEliminar from './EmpleadoEliminar';
import EmpleadoEditar from './EmpleadoEditar';
import EmpleadoAgregar from './EmpleadoAgregar';

const ListaEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    // Función para obtener los datos de la API
    const obtenerEmpleados = async () => {
      try {
        const response = await fetch('http://localhost/api_simple/empleados.php');
        const data = await response.json();
        setEmpleados(data);
      } catch (error) {
        console.error('Error al obtener los empleados:', error);
      }
    };

    // Llamar a la función para obtener los empleados al cargar el componente
    obtenerEmpleados();
  }, []);

  const agregarEmpleado = (empleado) => {
    setEmpleados([...empleados, empleado]);
  };

  const eliminarEmpleado = async (id) => {
    try {
      await fetch(`http://localhost/api_simple/empleados.php`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
      });
      // Actualizar la lista de empleados después de la eliminación
      setEmpleados(empleados.filter((empleado) => empleado.id !== id));
    } catch (error) {
      console.error('Error al eliminar el empleado:', error);
    }
  };




  return (
    <div>
    <h2 style={{ padding: '10px' }}>Lista de Empleados</h2>
    <EmpleadoAgregar agregarEmpleado={agregarEmpleado} />     
     
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f9fafb', fontWeight: 'bold' }}>
            Nombre
          </th>
          <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f9fafb', fontWeight: 'bold' }}>
            Apellido
          </th>
          <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f9fafb', fontWeight: 'bold' }}>
            Email
          </th>
          <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f9fafb', fontWeight: 'bold' }}>
            Fecha de Contratación
          </th>
          <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f9fafb', fontWeight: 'bold' }}>
            Salario
          </th>
          <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f9fafb', fontWeight: 'bold' }}>
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        {empleados.map((empleado) => (
          <tr key={empleado.id}>
            <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{empleado.nombre}</td>
            <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{empleado.apellido}</td>
            <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{empleado.email}</td>
            <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{empleado.fecha_contratacion}</td>
            <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{empleado.salario}</td>
            <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
              <EmpleadoEditar style={{ paddingLeft: '20px', }} empleado={empleado} />
              <EmpleadoEliminar id={empleado.id} eliminarEmpleado={eliminarEmpleado} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default ListaEmpleados;
