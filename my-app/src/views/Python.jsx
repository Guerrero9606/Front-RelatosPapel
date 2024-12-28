import Header from '../components/Header'
import Cards from '../components/Cards'
import Badge from 'react-bootstrap/Badge';
import '../styles/styles.css';

function Python () {
    return(
        <>
            <Header/>
            <h3>
                <Badge bg="secondary">Python</Badge>
            </h3>
            <Cards query="Python" items="10"/>
        </>
    )
}

export default Python