import Header from '../components/Header'
import Cards from '../components/Cards'
import Badge from 'react-bootstrap/Badge';
import '../styles/styles.css';

function Main () {
    return(
        <>
            <Header/>
            <h3>
                <Badge bg="secondary">Programacion</Badge>
            </h3>
            <Cards query="Programacion" items="5"/>
            <h3>
                <Badge bg="secondary">Desarrollo de software</Badge>
            </h3>
            <Cards query="desarrollo+de+software" items="5"/>
            <h3>
                <Badge bg="secondary">Seguridad informatica</Badge>
            </h3>
            <Cards query="Seguridad+informática" items="5"/>
            <h3>
                <Badge bg="secondary">Computacion</Badge>
            </h3>
            <Cards query="Computación" items="5"/>
        </>
    )
}

export default Main