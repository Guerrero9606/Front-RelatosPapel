import Header from '../components/Header'
import Cards from '../components/Cards'
import Badge from 'react-bootstrap/Badge';
import React, { useContext, useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { ContextBook } from '../components/ContextBook';

const fetchBooksFromMicroservice = async (filters) => {
    
    try {

        const facets = {
            categoryFacets: filters.categoryFacets ? filters.categoryFacets : '',
            priceRangeFacets: filters.priceRangeFacets ? filters.priceRangeFacets : '',
            authorFacets: filters.authorFacets ? filters.authorFacets : '',
        }

        const url = filters ? `http://localhost:8762/ms-books-catalogue/books?facets=true&selectedCategory=${facets.categoryFacets}&author=${facets.authorFacets}` : 'http://localhost:8762/ms-books-catalogue/books?facets=true';
        
        const response = await axios.post(url,  {"targetMethod": "GET"});
        if (!response.status) throw new Error('Error fetching data');
    
        const { books: booksData, facets: facetsData } = response.data;
    
        const getBooks = booksData.map((book) => ({
            id: book.id,
            title: book.title,
            author: book.author ? book.author : 'Autor desconocido',
            category: book.category,
            price: book.price,
            rating: book.rating,
            isbn: book.isbn,
            visible: book.visible,
            url: book.url ? book.url : 'https://via.placeholder.com/150?text=Sin+Imagen',
            publication_date: book.publication_Date,
        }));
    
        const getFacets = {
            categoryFacets: Object.entries(facetsData.categoryFacets).map(([key, value]) => ({ facet: key, value: value })),
            authorFacets: Object.entries(facetsData.authorFacets).map(([key, value]) => ({ facet: key, value: value })),
            priceRangeFacets: Object.entries(facetsData.priceRangeFacets).map(([key, value]) => ({ facet: key, value: value })),
        }
        
        return {getBooks, getFacets};
  
    } catch (error) {
        console.error('Error:', error);
        return {getBooks: [], getFacets: {}};
    }
};

function Main ({facet}) {
    const { updateList } = useContext(ContextBook);

    const [facets, setfacets] = useState({
        categoryFacets: [],
        authorFacets: [],
        priceRangeFacets: [],
    });

    const [filters, setFilters] = useState({
        categoryFacets: null,
        authorFacets: null,
        priceRangeFacets: null,
    });
    
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(true);
    const [isAuthorOpen, setIsAuthorOpen] = useState(true);

    useEffect(() => {
        
        if (facet !== 'all') {
            
            setFilters({ categoryFacets: facet });
        }

    }, [facet]);

    useEffect(() => {
        
        const loadBooks = async () => {
            const {getBooks, getFacets} = await fetchBooksFromMicroservice(filters);
            
            updateList(getBooks);
            setfacets(getFacets);
        };
        loadBooks();
    }, [filters]);

    const toggleCategory = () => (setIsCategoryOpen(!isCategoryOpen));
    const togglePriceRange = () => (setIsPriceRangeOpen(!isPriceRangeOpen));
    const toggleAuthor = () => (setIsAuthorOpen(!isAuthorOpen));

    const handleFilterChange = (category, facet, e) => {
        e.preventDefault();

        setFilters(prevFilter => {
            let newFilters = { ...prevFilter };
            
            if (newFilters[category] === facet) {
                newFilters[category] = null;
            } else {
                newFilters[category] = facet;
            }
            return newFilters;
        });

    };


    return(
        <>
            <Header/>

            {facet === 'all' ? (
                
                <Row>
                    <Col className='col-3' style={{position: 'sticky', top: '0', height: '100vh'}} >
                        <Card bg="dark" text="white" style={{height: '90%'}}>
                        <Card.Header>Filtros</Card.Header>
    
                        <Card.Body style={{overflow: 'auto', height: '500px'}}>
                            <Card.Text>
                            {/* Facetas de Categorías */}
                            <div>
                                <hr style={{border: '2px solid #ccc', margin: '5px 0'}}/>
                                <div 
                                style={{cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                                onClick={() => {toggleCategory();}}
                                >
    
                                <h5 className='col-9'>Categorías </h5>
                                <i className={`bi ${isCategoryOpen ? 'bi-file-arrow-up' : 'bi-file-arrow-down'} col-3`}></i>
                                </div>
                                <hr style={{border: '2px solid #ccc', margin: '0 0 15px 0'}}/>
    
                                {isCategoryOpen && (
                                <Card.Body style={{ padding: '0' }}>
                                    <Card.Text>
                                    <div>
                                        {isCategoryOpen && (
                                        <ul style={{ listStyleType: 'none', padding: '0' }}>
                                            {facets?.categoryFacets?.map((facet, index) => (
                                            <li style={{ paddingBottom: '5px' }} key={facet.id || index} >
                                                <input 
                                                type="checkbox"
                                                id={facet.facet}
                                                checked={filters.categoryFacets === facet.facet}
                                                onChange={(e) => handleFilterChange('categoryFacets', facet.facet, e)}
                                                style={{ marginRight: '5px', cursor: 'pointer' }}
                                                />
                                                <label style={{cursor: 'pointer'}} htmlFor={facet.facet}> {facet.facet} ({facet.value}) </label>
    
                                            </li>
                                            ))}
                                        </ul>
                                        )}
                                    </div>
                                    </Card.Text>
                                </Card.Body>
                                )}
                            </div>
    
                            {/* Facetas de rango de precios */}
                            <div>
    
                                <hr style={{border: '2px solid #ccc', margin: '5px 0'}}/>
                                <div 
                                style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}
                                onClick={() => {togglePriceRange();}}
                                >
                                <h5 className='col-9'>Rango de precios</h5>
                                <i className={`bi ${isPriceRangeOpen ? 'bi-file-arrow-up' : 'bi-file-arrow-down'} col-3`}></i>
                                </div>
                                <hr style={{border: '2px solid #ccc', margin: '0 0 15px 0'}}/>
    
                                {isPriceRangeOpen && (
                                <Card.Body style={{ padding: '0' }}>
                                    <Card.Text>
                                    <div>
                                        {isPriceRangeOpen && (
                                            <ul style={{ listStyleType: 'none', padding: '0' }}>
                                            {facets?.priceRangeFacets?.map((facet, index) => (
                                                <li style={{ paddingBottom: '5px' }} key={index} >
                                                <input 
                                                    type="checkbox"
                                                    id={facet.facet}
                                                    checked={filters.priceRangeFacets === facet.facet}
                                                    onChange={(e) => handleFilterChange('priceRangeFacets', facet.facet, e)}
                                                    style={{ marginRight: '5px', cursor: 'pointer' }}
                                                />
                                                <label style={{cursor: 'pointer'}} htmlFor={facet.facet}>{facet.facet} ({facet.value}) </label>
    
                                                </li>
                                            ))}
                                            </ul>
                                        )}
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                                )}
                            </div>
    
                            {/* Facetas de Autores */}
                            <div>
    
                                <hr style={{border: '2px solid #ccc', margin: '5px 0'}}/>
                                <div 
                                style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}
                                onClick={() => {toggleAuthor();}}
                                >
                                <h5 className='col-9'>Autores</h5>
                                <i className={`bi ${isAuthorOpen ? 'bi-file-arrow-up' : 'bi-file-arrow-down'} col-3`}></i>
                                </div>
                                <hr style={{border: '2px solid #ccc', margin: '0 0 15px 0'}}/>
    
                                {isAuthorOpen && (
                                <Card.Body style={{ padding: '0' }}>
                                    <Card.Text>
                                    <div>
                                        {isAuthorOpen && (
                                        <ul style={{ listStyleType: 'none', padding: '0' }}>
                                            {facets?.authorFacets?.map((facet, index) => (
                                            <li style={{ paddingBottom: '5px' }} key={index} >
                                            
                                                <input 
                                                type="checkbox"
                                                id={facet.facet}
                                                checked={filters.authorFacets === facet.facet}
                                                onChange={(e) => handleFilterChange('authorFacets', facet.facet, e)}
                                                style={{ marginRight: '5px', cursor: 'pointer' }}
                                                />
                                                <label style={{cursor: 'pointer'}} htmlFor={facet.facet}>{facet.facet} ({facet.value}) </label>
                                            
                                            </li>
                                            ))}
                                        </ul>
                                        )}
                                    </div>
                                    </Card.Text>
                                </Card.Body>
                                )}
                            </div>
                            </Card.Text>
                        </Card.Body>
                        
                        </Card>
                    </Col>
                    <Col className='col-9'>
                        <Cards />
                    </Col>
                </Row>
            ) : 
                <div>
                    <h3>
                        <Badge bg="dark">{facet}</Badge>
                    </h3>
                    <Col className='col-12'>
                        <Cards/>
                    </Col>
                </div>
            }
        
        </>
    )
}

export default Main