import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from "react-bootstrap/NavDropdown"
import { Link } from 'react-router-dom';


export default function Menu() {
    return (
        <>
        {/* bg=primary pone el color primario de bootstrap como fondo (azul), ds-bs-theme=white pone las letras en blanco */}
        <Navbar bg="primary" data-bs-theme="white">
        {/* Crea un contenedor responsive */}
        <Container>
            {/* Vuelve a la pagina principal */}
          <Navbar.Brand href="#home">TP DDS</Navbar.Brand>
          <Nav className="me-auto">
            {/* NavDropdown mostrara los items en una desplegable bajo el nombre de Limpieza */}
            <NavDropdown title="Limpieza" id="navbarScrollingDropdown">
                {/* Se utiliza as={Link} to="ruta" para favorecer un enfoque SPA */}
                <NavDropdown.Item as={Link} to="/articulos-limpieza">Articulos</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/registrar-limpieza">Registrar</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      </>
    );
}