import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListaEmpleados from './components/ListaDeEmpleados';

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<ListaEmpleados />} />
            {/* <Route path="/add" element={<AgregarEmpleado />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Router;
