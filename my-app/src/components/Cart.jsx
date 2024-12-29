import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { useCart } from './CartContext';
import { Button, Table } from 'react-bootstrap';

const Cart = () => {
  const { cart, dispatch } = useCart();

  const removeFromCart = (book) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: book });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div id="div-table">
        <h2>
        <Badge bg="dark">Carrito de compras</Badge>
        </h2>
      {cart.length > 0 ? (
        <Table striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((book, index) => (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <Button variant="danger" onClick={() => removeFromCart(book)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Tu carrito está vacío</p>
      )}

      {cart.length > 0 && (
        <div id="div-buttoms-table">
          <Button variant="secondary" onClick={clearCart}>
            Vaciar Carrito
          </Button>
          <Button variant="success" className="ms-2">
            Proceder al Pago
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
