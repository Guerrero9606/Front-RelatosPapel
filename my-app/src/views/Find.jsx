import Header from '../components/Header'
import Cards from '../components/Cards'
import Badge from 'react-bootstrap/Badge';
import '../styles/styles.css';
import { useLocation } from "react-router-dom";
import React from "react";

function Find () {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryText = queryParams.get("query");

    return(
        <>
            <Header/>
            <h3>
                <Badge bg="secondary">Busqueda por: {queryText} </Badge>
            </h3>
            <Cards query={queryText} items="10"/>
        </>
    )
}

export default Find