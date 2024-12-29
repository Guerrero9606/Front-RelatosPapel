import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Cart from './Cart';
import { useCart } from './CartContext';
import Badge from 'react-bootstrap/Badge';

function CartOffCanvas() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { cart } = useCart();

  return (
    <>
      <Button variant="dark" onClick={handleShow} id='btn-cart'>
        Carrito
        <Badge bg="secondary" id='badge-cart'>{cart.length}</Badge>
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Tu carrito de compras</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Cart />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CartOffCanvas;