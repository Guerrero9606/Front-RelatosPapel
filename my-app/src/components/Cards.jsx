import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { ContextBook } from './ContextBook';

function Cards() {
  const {globalList} = useContext(ContextBook);
  const [books, setBooks] = useState([]);

  const { dispatch } = useCart();

  useEffect(() => {
    setBooks(globalList);

  }, [globalList]);

  const addToCart = (book) => {
    dispatch({ type: 'ADD_TO_CART', payload: book });
  };

  if (books.length == 0) {
    return  <ProgressBar animated now={45} />;
  }

  return (
    
    <Row xs={4} md={6} lg={4} className="g-1">

      {books.length > 0 ? ( books.map((book) => (
        <Col key={book.id}>
          {[
            'Dark',
          ].map((variant) => (
          <Card bg={variant.toLowerCase()}
            key={variant}
            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          >
            <Card.Img variant="top" src={book.url} alt={book.title} />
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>Autor: {book.author}</Card.Text>
            </Card.Body>
            <ButtonGroup>
                <Button variant="primary" size="sm" onClick={() => addToCart(book)}>Añadir al carrito</Button>
                <Link to={`/book/${book.id}`}>
                  <Button variant="light" size="sm" >Detalles</Button>
                </Link>
            </ButtonGroup>
          </Card>
          ))}
        </Col>
      ))) : (console.log('No hay libros disponibles'
      ))}
    </Row>
  );
}

export default Cards;
