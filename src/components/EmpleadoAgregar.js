import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const EmpleadoAgregar = ({ agregarEmpleado }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [fechaContratacion, setFechaContratacion] = useState('');
  const [salario, setSalario] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleAgregar = async () => {
    // Crea un objeto con los datos del empleado
    const empleado = {
      nombre,
      apellido,
      email,
      fecha_contratacion: fechaContratacion, // Mantener el formato YYYY-MM-DD
      salario
    };

    try {
      // Realiza la solicitud POST para agregar el empleado a la API
      const response = await fetch('http://localhost/api_simple/empleados.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(empleado)
      });

      if (response.ok) {
        // Si la solicitud es exitosa, agrega el empleado a la lista
        agregarEmpleado(empleado);
        // Cierra el modal después de agregar
        setShowModal(false);
      } else {
        console.error('Error al agregar el empleado:', response.status);
      }
    } catch (error) {
      console.error('Error al agregar el empleado:', error);
    }
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleApellidoChange = (event) => {
    setApellido(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFechaContratacionChange = (event) => {
    setFechaContratacion(event.target.value);
  };

  const handleSalarioChange = (event) => {
    setSalario(event.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <Button variant="primary" onClick={handleOpenModal}>
        Agregar Empleado
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" value={nombre} onChange={handleNombreChange} />
          </div>
          <div>
            <label htmlFor="apellido">Apellido:</label>
            <input type="text" id="apellido" value={apellido} onChange={handleApellidoChange} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={handleEmailChange} />
          </div>
          <div>
            <label htmlFor="fechaContratacion">Fecha de Contratación:</label>
            <input
              type="date"
              id="fechaContratacion"
              value={fechaContratacion}
              onChange={handleFechaContratacionChange}
            />
          </div>
          <div>
            <label htmlFor="salario">Salario:</label>
            <input type="number" id="salario" value={salario} onChange={handleSalarioChange} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAgregar}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmpleadoAgregar;
