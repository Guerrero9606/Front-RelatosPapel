import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CartOffCanvas from './CartOffCanvas';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Header () {

  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim() !== "") {
      console.log(searchValue)
      navigate(`/Find?query=${searchValue}`); // Redirige a la página de resultados con el valor de búsqueda
    }
  };

    return (
        <>
          {['sm'].map((expand) => (
            <Navbar key={expand} expand={expand} className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
              <Container fluid>
                <Navbar.Brand>
                    <Nav.Link href="/">RELATOS DE PAPEL</Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                      Menu
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link href="/Home">Inicio</Nav.Link>
                      <NavDropdown
                        title="Categorias principales"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                      >
                        <NavDropdown.Item href="/Javascript">
                            Javascript
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/Python">
                            Python
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/Criptografia">
                            Criptografía
                        </NavDropdown.Item>
                      </NavDropdown>
                      <Nav.Link href="#"><CartOffCanvas /></Nav.Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSearch}>
                      <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        value={searchValue} // Vincula el valor del estado al input
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                      <Button variant="outline-success" type="submit">Search</Button>
                    </Form>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
        </>
    );
}

export default Header