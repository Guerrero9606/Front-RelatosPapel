import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import ProgressBar from 'react-bootstrap/ProgressBar';

const fetchBooksFromOpenLibrary = async (query, items) => {
  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    if (!response.ok) throw new Error('Error fetching data');
    const data = await response.json();
    return data.docs.slice(0, items).map((book) => ({
      id: book.key.replace('works/', ''),
      title: book.title,
      author: book.author_name ? book.author_name[0] : 'Autor desconocido',
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : 'https://via.placeholder.com/150?text=Sin+Imagen',
    }));
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

function Cards({ query, items }) {
  const [books, setBooks] = useState([]);
  const { dispatch } = useCart();

  useEffect(() => {
    const loadBooks = async () => {
      const booksData = await fetchBooksFromOpenLibrary(query, items);
      setBooks(booksData);
    };
    loadBooks();
  }, [query, items]);

  const addToCart = (book) => {
    dispatch({ type: 'ADD_TO_CART', payload: book });
  };

  if (books.length == 0) {
    return  <ProgressBar animated now={45} />;
  }

  return (
    <Row xs={4} md={6} lg={5} className="g-4">
      {books.map((book) => (
        <Col key={book.id}>
          {[
            'Dark',
          ].map((variant) => (
          <Card bg={variant.toLowerCase()}
            key={variant}
            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          >
            <Card.Img variant="top" src={book.cover} alt={book.title} />
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>Autor: {book.author}</Card.Text>
            </Card.Body>
            <ButtonGroup>
                <Button variant="primary" size="sm" onClick={() => addToCart(book)}>Añadir al carrito</Button>
                <Link to={`/book${book.id}`}>
                <Button variant="light" size="sm" >Detalles</Button>
                </Link>
            </ButtonGroup>
          </Card>
          ))}
        </Col>
      ))}
    </Row>
  );
}

export default Cards;
