import Header from '../components/Header'
import Cards from '../components/Cards'
import Badge from 'react-bootstrap/Badge';
import '../styles/styles.css';

function Javascript () {
    return(
        <>
            <Header/>
            <h3>
                <Badge bg="secondary">Javascript</Badge>
            </h3>
            <Cards query="Javascript" items="10"/>
        </>
    )
}

export default Javascript