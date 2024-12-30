import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './views/Main';
import DetailsBooks from './views/DetailsBook';
import Javascript from './views/Javascript';
import Python from './views/Python';
import Criptografia from './views/Criptografia';
import CartDetails from './views/CartDetails';
import Landing from './views/Landing';
import Find from './views/Find';
import { CartProvider } from './components/CartContext';
import './styles/styles.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Home" element={<Main />} />
          <Route path="/book/:id" element={<DetailsBooks />} />
          <Route path="/Javascript" element={<Javascript />} />
          <Route path="/Python" element={<Python />} />
          <Route path="/Criptografia" element={<Criptografia />} />
          <Route path="/Cart" element={<CartDetails />} />
          <Route path="/Find" element={<Find />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
