import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './views/Main';
import DetailsBooks from './views/DetailsBook';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/book/:id" element={<DetailsBooks />} /> { /*Ruta para la vista de detalles */ }
      </Routes>
    </Router>
  );
  
}

export default App
