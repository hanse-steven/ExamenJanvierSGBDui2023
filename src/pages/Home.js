import React from 'react'
import Navigation from "../components/Navigation"
import {Button, Nav} from "react-bootstrap"
import Footer from "../components/Footer"

const Home = () => {
    return (
        <div>
            <Navigation/>

            <div className="ajustHeight">
                <div className="d-grid gap-4 px-5">
                    <Button variant="primary" size="lg">
                        <Nav.Link href="/vente">Vente</Nav.Link>
                    </Button>

                    <Button variant="primary" size="lg">
                        <Nav.Link href="/magasin">Magasin</Nav.Link>
                    </Button>

                    <Button variant="primary" size="lg">
                        <Nav.Link href="/client">Client</Nav.Link>
                    </Button>

                    <Button variant="primary" size="lg">
                        <Nav.Link href="/article">Article</Nav.Link>
                    </Button>
                </div>
            </div>


            <Footer />
        </div>
    )
}

export default Home