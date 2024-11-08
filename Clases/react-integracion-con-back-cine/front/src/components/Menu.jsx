import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function Menu() {
    return (
        <>
        <Navbar bg="primary" data-bs-theme="white">
        <Container>
          <Navbar.Brand href="#home">Cine</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/registrar">Registrar</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </>
    );
}