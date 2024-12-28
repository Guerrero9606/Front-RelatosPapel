import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const fetchBookDetails = async (id) => {
  try {
    const response = await fetch(`https://openlibrary.org/works/${id}.json`);
    if (!response.ok) throw new Error('Error fetching book details');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

function BookDetails() {
  const { id } = useParams(); // Obtener el ID de la URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    const loadBookDetails = async () => {
      const bookDetails = await fetchBookDetails(id);
      setBook(bookDetails);
    };
    loadBookDetails();
  }, [id]);

  if (!book) {
    return <div>Cargando detalles...</div>;
  }

  const urlImg = book.covers
  ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
  : 'https://via.placeholder.com/150?text=Sin+Imagen'

  return (
    <Card style={{ width: '48rem', height: '50rem'}} border="dark">
        <Card.Img variant="top" src={urlImg}/>
        <Card.Body>
            <Card.Title>
                Titulo: {book.title}
            </Card.Title>
            <Card.Text>
                Descripcion: {book.description ? book.description : 'No hay descripción disponible.'}
            </Card.Text>
            <Button variant="primary">Comprar</Button>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated: {book['last_modified']['value']}</small>
        </Card.Footer>
    </Card>
  )
};

export default BookDetails;
