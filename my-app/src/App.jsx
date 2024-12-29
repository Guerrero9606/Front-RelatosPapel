import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './views/Main';
import DetailsBooks from './views/DetailsBook';
import Javascript from './views/Javascript';
import Python from './views/Python';
import Criptografia from './views/Criptografia';
import CartDetails from './views/CartDetails';
import { CartProvider } from './components/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/book/:id" element={<DetailsBooks />} />
          <Route path="/Javascript" element={<Javascript />} />
          <Route path="/Python" element={<Python />} />
          <Route path="/Criptografia" element={<Criptografia />} />
          <Route path="/Cart" element={<CartDetails />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
