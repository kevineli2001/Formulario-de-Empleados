import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';



const EmpleadoEditar = ({ empleado }) => {
  const [nombre, setNombre] = useState(empleado.nombre);
  const [apellido, setApellido] = useState(empleado.apellido);
  const [email, setEmail] = useState(empleado.email);
  const [fechaContratacion, setFechaContratacion] = useState(empleado.fechaContratacion);
  const [salario, setSalario] = useState(empleado.salario);
  const [showModal, setShowModal] = useState(false);

  const handleEditar = async () => {
    const formattedFechaContratacion = new Date(fechaContratacion).toISOString().split('T')[0];

    const data = {
      id: empleado.id,
      nombre,
      apellido,
      email,
      fecha_contratacion: formattedFechaContratacion,
      salario
    };

    try {
      const response = await fetch(`http://localhost/api_simple/empleados.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        Swal.fire({
          title: 'Empleado Actualizado',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        });
      } else {
        throw new Error('Error al actualizar el empleado');
      }
    } catch (error) {
      console.error('Error al actualizar el empleado:', error);
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al actualizar el empleado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      });
    }

    setShowModal(false);
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
    const formattedFechaContratacion = event.target.value; // El valor proporcionado por el input tipo date
    setFechaContratacion(formattedFechaContratacion);
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
        Editar
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Empleado</Modal.Title>
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
          <Button variant="primary" onClick={handleEditar}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmpleadoEditar;
