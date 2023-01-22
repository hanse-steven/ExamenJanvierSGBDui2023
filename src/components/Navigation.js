import React from 'react'
import {Container, Nav, Navbar} from "react-bootstrap"
import {NavLink} from "react-router-dom"

const Navigation = () => {
    return (
        <div className="row mb-4">
            <div className="col-md-12">
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                alt=""
                                src="/hepl-logo-light.svg"
                                height="30"
                                className="d-inline-block align-top"
                            />
                        </Navbar.Brand>
                        <Nav className="me-auto">
                            <NavLink to="/vente"
                                     className={(nav) => (nav.isActive ? "nav-link active" : "nav-link")}>Vente</NavLink>
                            <NavLink to="/magasin"
                                     className={(nav) => (nav.isActive ? "nav-link active" : "nav-link")}>Magasin</NavLink>
                            <NavLink to="/client"
                                     className={(nav) => (nav.isActive ? "nav-link active" : "nav-link")}>Client</NavLink>
                            <NavLink to="/article"
                                     className={(nav) => (nav.isActive ? "nav-link active" : "nav-link")}>Article</NavLink>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        </div>
    )
}

export default Navigation