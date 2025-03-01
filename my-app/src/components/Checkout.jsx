import { React, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { useCart } from './CartContext';
import { Button, Table } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import axios from 'axios';

const addPurchase = async (cart) => {

  try {
    const purchase = cart[0];
    console.log(purchase); 

    const url =  "http://localhost:8762/ms-books-payments/purchases";
    const body = 
    {
      "targetMethod": "POST",
      "queryParams": {},
      "body": {
        "bookId": purchase.id,
        "quantity": 1,
        "buyer": "Pedro Sanchez",
        "status": "PENDING",
        "purchaseDate": ""
      }
    }

    const response = await axios.post(url, body);
    if (!response.status) throw new Error('Error doing purchase');
    
    const { data } = response;
    console.log(data)
    return data;

  } catch (error) {
    console.error('Error', error);
    return {};
  }
}; 

const Checkout = () => {
  const { cart, dispatch } = useCart();
  const [show, setShow] = useState(false);
  const [ purchaseDone, setPurchaseDone ] = useState({});

  const removeFromCart = (book) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: book });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const handleSubmitPurchase = (cart, e) => {
    e.preventDefault();
    
    const data = addPurchase(cart)
    .then((response) => {

      console.log(response)
      if (response) {
        
        setPurchaseDone(response);
        setShow(true);
      } else {
        console.error('No se realizó correctamente la compra');
      }
    });

  }

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
        <Alert key="dark" variant="dark">
            Tu carrito de compras esta vacio, ve al <Alert.Link href="/Home">inicio</Alert.Link> para agregar elementos a tu carrito.
        </Alert>
      )}

      {cart.length > 0 && (
        <div id="div-buttoms-table">
            <Button variant="secondary" onClick={clearCart}>
                Vaciar Carrito
            </Button>
            <Alert show={show} variant="success">
            <Alert.Heading>Pago realizado</Alert.Heading>
                <p>
                El pago se ha realizado satisfactoriamente a nombre de {purchaseDone.buyer}, al cerrar esta ventana sera redirigido al inicio.
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                <Link to={`/`}>
                    <Button onClick={() => {setShow(false), clearCart() }} variant="outline-success">
                        Cerrar
                    </Button>
                </Link>
                </div>
            </Alert>
            {!show && <Button onClick={ (e) => handleSubmitPurchase(cart, e) } className="ms-2" variant="success">Pagar</Button>}
        </div>
      )}
    </div>
  );
};

export default Checkout;
