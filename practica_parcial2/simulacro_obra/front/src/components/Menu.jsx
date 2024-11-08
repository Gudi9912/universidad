import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function Menu() {
    return (
        <>
        {/* bg=primary pone el color primario de bootstrap como fondo (azul), ds-bs-theme=white pone las letras en blanco */}
        <Navbar bg="primary" data-bs-theme="white">
        {/* Crea un contenedor responsive */}
        <Container>
            {/* Vuelve a la pagina principal */}
          <Navbar.Brand href="#home">Obras de teatro</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/registrar">Registrar</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </>
    );
}