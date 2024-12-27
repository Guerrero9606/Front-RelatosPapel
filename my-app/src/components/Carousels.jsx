import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const fetchBooksFromOpenLibrary = async (query) => {
  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    if (!response.ok) throw new Error('Error fetching data');
    const data = await response.json();
    return data.docs.slice(0, 8).map((book) => ({
      id: book.key,
      title: book.title,
      author: book.author_name ? book.author_name[0] : 'Autor desconocido',
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : 'https://via.placeholder.com/150?text=Sin+Imagen',
    }));
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

const Carousels = ({ query }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      const booksData = await fetchBooksFromOpenLibrary(query);
      setBooks(booksData);
    };
    loadBooks();
  }, [query]);

  return (
    <Carousel data-bs-theme="dark">
      {books.map((book) => (
        <Carousel.Item key={book.id}>
          <img
            className="d-block w-100"
            src={book.cover}
            alt={book.title}
          />
          <Carousel.Caption>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Carousels;
