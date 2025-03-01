import axios from "axios";
import { ContextBook } from "./ContextBook";
import Cards from './Cards';
import Header from './Header';
import Badge from 'react-bootstrap/Badge';
import { useContext, useEffect } from "react";
import Col from 'react-bootstrap/Col';

const fetchBookBySearch = async (queryText) => {
    try {

        const url = `http://localhost:8762/ms-books-catalogue/books?facets=true&title=${queryText}`; 
        const response = await axios.post(url, {"targetMethod": "GET"});

        if(!response.status) throw new Error("Error fetching books");

        const data = response.data;

        return data;

    } catch (error) {
        console.error("Error", error);
        return [];
    }
};

function FindBook ({queryText}) {
    const { updateList } = useContext(ContextBook);

    useEffect(() => {
        const loadBooks = async () => {
            const { books } = await fetchBookBySearch(queryText);
            console.log(books);
            updateList(books);
        }
        loadBooks();
        
    }, [queryText]);

    return (
        <>
            <Header/>
            <h3>
                <Badge bg="dark"></Badge>
            </h3>
            <Col className='col-12'>
                <Cards/>
            </Col>
        </>
    )
}

export default FindBook;