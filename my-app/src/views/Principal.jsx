import Header from '../components/Header'
import Cards from '../components/Cards'
import Badge from 'react-bootstrap/Badge';

function Principal () {
    return(
        <>
            <Header/>
            <h3>
                <Badge bg="secondary">Programacion</Badge>
            </h3>
            <Cards query="Programacion"/>
            <h3>
                <Badge bg="secondary">Desarrollo de software</Badge>
            </h3>
            <Cards query="desarrollo+de+software"/>
            <h3>
                <Badge bg="secondary">Seguridad informatica</Badge>
            </h3>
            <Cards query="Seguridad+informática"/>
            <h3>
                <Badge bg="secondary">Computacion</Badge>
            </h3>
            <Cards query="Computación"/>
        </>
    )
}

export default Principal