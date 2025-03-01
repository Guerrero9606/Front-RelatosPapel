import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './views/Main';
import DetailsBooks from './views/DetailsBook';
import Novela from './views/Novela';
import Ficcion from './views/Ficcion';
import Fantasia from './views/Fantasia';
import CartDetails from './views/CartDetails';
import Landing from './views/Landing';
import Find from './views/Find';
import { CartProvider } from './components/CartContext';
import './styles/styles.css';
import { useState } from 'react';
import { ContextBook } from './components/ContextBook';

function App() {
  const [globalList, setGlobalList] = useState([]);

  let updateList = (books) => {
    setGlobalList(books);
  }

  return (
    <CartProvider>
      <Router>
        <ContextBook.Provider value={{globalList, updateList}}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/Home" element={<Main facet="all"/>} />
            <Route path="/book/:id" element={<DetailsBooks />} />
            <Route path="/Novela" element={<Novela />} />
            <Route path="/Ficcion" element={<Ficcion />} />
            <Route path="/Fantasia" element={<Fantasia />} />
            <Route path="/Cart" element={<CartDetails />} />
            <Route path="/Find" element={<Find />} />
          </Routes>
        </ContextBook.Provider>
      </Router>
    </CartProvider>
  );
}

export default App;
