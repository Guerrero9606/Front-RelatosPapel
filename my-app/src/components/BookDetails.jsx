import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useCart } from './CartContext';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

const fetchBookDetails = async (id) => {
  console.log(id)
  try {
    const url = "http://localhost:8762/ms-books-catalogue/books/";

    const response = await axios.post(url + id,  {"targetMethod": "GET"});

    if (!response.status) throw new Error('Error fetching book details');

    const data = response.data;

    return data;

  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

function BookDetails() {
  const { id } = useParams(); // Obtener el ID de la URL
  const [book, setBook] = useState(null);
  const { dispatch } = useCart();

  useEffect(() => {
    const loadBookDetails = async () => {
      const bookDetails = await fetchBookDetails(id);
      setBook(bookDetails);
    };
    loadBookDetails();
  }, [id]);

  const addToCart = (book) => {
    dispatch({ type: 'ADD_TO_CART', payload: book });
  };

  if (!book) {
    return  <Spinner animation="border" role="status" variant="light">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
  }

  const urlImg = book.url
  ? book.url
  : 'https://via.placeholder.com/150?text=Sin+Imagen'

  return (
    <Card style={{ width: '48rem', height: '50rem'}} border="dark" bg="dark" text='white'>
        <Card.Img variant="top" src={urlImg}/>
        <Card.Body>
            <Card.Title>
                Titulo: {book.title}
            </Card.Title>
            <Card.Text>
                Descripcion: {book.description ? book.description : 'No hay descripción disponible.'}
            </Card.Text>
            <Button variant="primary" onClick={() => addToCart(book)}>Comprar</Button>
        </Card.Body>
        <Card.Footer>
          {/* <small className="text-muted">Last updated: {book['last_modified']['value']}</small> */}
        </Card.Footer>
    </Card>
  )
};

export default BookDetails;
