import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './views/Main';
import DetailsBooks from './views/DetailsBook';
import Javascript from './views/Javascript';
import Python from './views/Python';
import Criptografia from './views/Criptografia';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/book/:id" element={<DetailsBooks />} /> 
        <Route path="/Javascript" element={<Javascript />} />
        <Route path="/Python" element={<Python />} /> 
        <Route path="/Criptografia" element={<Criptografia />} />  
      </Routes>
    </Router>
  );
  
}

export default App
