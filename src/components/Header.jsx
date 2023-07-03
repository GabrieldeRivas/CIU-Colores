import React, { Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import '../css/header.css';

const Header = () => {
    return (
        <Fragment>
            <Navbar expand="md" variant="dark">
                <Container fluid className='container-90'>
                    <Navbar.Brand href="#home">
                        <img
                        src="ruta-del-logo.png"
                        className="d-inline-block align-top"
                        alt="Logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ml-auto">
                        <Nav.Link href="#link1">Enlace 1</Nav.Link>
                        <Nav.Link href="#link2">Enlace 2</Nav.Link>
                        <Nav.Link href="#link3">Enlace 3</Nav.Link>
                        <Nav.Link href="#link4">Enlace 4</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>        
                </Container>
            </Navbar>
        </Fragment>
    );
}

export default Header;