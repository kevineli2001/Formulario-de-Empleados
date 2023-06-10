import React from 'react';

import Swal from 'sweetalert2';

const EmpleadoEliminar = ({ id, eliminarEmpleado }) => {
  const handleEliminar = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarEmpleado(id);
      }
    });
  };

  return (
    <button className="btn btn-danger" onClick={handleEliminar}>
      Eliminar
    </button>
  );
};

export default EmpleadoEliminar;
