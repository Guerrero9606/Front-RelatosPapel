import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const fetchBooksFromOpenLibrary = async (query) => {
  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    if (!response.ok) throw new Error('Error fetching data');
    const data = await response.json();
    return data.docs.slice(0, 5).map((book) => ({
      id: book.key,
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

function Cards({ query }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      const booksData = await fetchBooksFromOpenLibrary(query);
      setBooks(booksData);
    };
    loadBooks();
  }, [query]);

  return (
    <Row xs={4} md={6} lg={5} className="g-4">
      {books.map((book) => (
        <Col key={book.id}>
          <Card>
            <Card.Img variant="top" src={book.cover} alt={book.title} />
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>Autor: {book.author}</Card.Text>
            </Card.Body>
            <ButtonGroup size="sm" >
                <Button variant="primary">Añadir al carrito</Button>
                <Button variant="info">Detalles</Button>
            </ButtonGroup>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Cards;
