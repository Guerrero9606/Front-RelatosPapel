import '../styles/styles.css';
import { useLocation } from "react-router-dom";
import FindBook from '../components/FindBook';
import React from "react";

function Find () {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryText = queryParams.get("query");

    return(
        <>
            <FindBook queryText={queryText}/>
        </>
    )
}

export default Find