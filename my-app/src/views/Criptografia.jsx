import Header from '../components/Header'
import Cards from '../components/Cards'
import Badge from 'react-bootstrap/Badge';
import '../styles/styles.css';

function Criptografia () {
    return(
        <>
            <Header/>
            <h3>
                <Badge bg="secondary">Criptografia</Badge>
            </h3>
            <Cards query="Criptografia" items="10"/>
        </>
    )
}

export default Criptografia