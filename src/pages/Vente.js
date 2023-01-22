import React, {useEffect, useState} from 'react'
import Navigation from "../components/Navigation"
import {Button, Card, Image, ListGroup, Modal, Spinner, Table} from "react-bootstrap"
import axios from "axios"
import {formatageMonetaire} from "../divers/utils"
import Footer from "../components/Footer"

const Vente = () => {
    const [data, setData] = useState([])
    const [selectedItem, setSelectedItem] = useState(-1)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        axios
            .get("http://localhost:8080/ords/db1/api/vente")
            .then((res) => setData(res.data))
    }, [])

    const calculPrixTotal = (tab) => {
        let total = 0
        for (let elem of tab) {
            console.log(tab)
            total += parseFloat(elem.prix) * parseInt(elem.quantite)
        }
        return formatageMonetaire(total)
    }

    return (
        <div>
            <Navigation/>

            <div className="row px-5 ajustHeight">

                {
                    selectedItem === -1 && data.length === 0 &&
                    (<Spinner animation="border" variant="primary"/>)
                }
                <ListGroup className="col-md-3 pb-xs-4 pb-sm-4" defaultActiveKey="0">
                    {
                        data
                            .sort((a, b) => a.id - b.id)
                            .map((vente, index) => (
                                <ListGroup.Item action key={index} onClick={() => setSelectedItem(index)}>
                                    Vente n°{vente.id}
                                </ListGroup.Item>
                            ))
                    }
                </ListGroup>
                {
                    selectedItem !== -1 && (
                        <div className="col-md-9">

                            <div className="row pb-xs-4 pb-sm-4">
                                <div className="col-sm-6 pb-xs-4 pb-sm-4">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Client</Card.Title>
                                            <Card.Text>
                                                <ul>
                                                    <li>Nom: {data[selectedItem].client.nom}</li>
                                                    <li>Prenom: {data[selectedItem].client.prenom}</li>
                                                    <li>Mail: {data[selectedItem].client.mail}</li>
                                                </ul>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>

                                <div className="col-sm-6">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Magasin</Card.Title>
                                            <Card.Text>
                                                <ul>
                                                    <li>Nom: {data[selectedItem].magasin.nom}</li>
                                                    <li>Code Postal: {data[selectedItem].magasin['code postal']}</li>
                                                </ul>
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => setShowModal(true)}>
                                                Afficher le ticket de caisse
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>

                            <div className="row pb-xs-4 pb-sm-4">
                                <div className="col-md-12">
                                    <Table striped>
                                        <thead>
                                        <tr>
                                            <th scope="col">Libellé</th>
                                            <th scope="col" className="text-end">Prix Unité</th>
                                            <th scope="col" className="text-end">Quantité</th>
                                            <th scope="col" className="text-end">Prix Total</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            data[selectedItem].articles
                                                .sort((a, b) => a.id - b.id)
                                                .map((article, index) => (
                                                    <tr key={index}>
                                                        <td>{article.nom}</td>
                                                        <td className="text-end">{formatageMonetaire(article.prix)}</td>
                                                        <td className="text-end">{article.quantite}</td>
                                                        <td className="text-end">{formatageMonetaire(article.prix * article.quantite)}</td>
                                                    </tr>
                                                ))
                                        }
                                        <tr>
                                            <td colSpan="2"></td>
                                            <td className="text-end bold">Total</td>
                                            <td className="text-end">
                                                {
                                                    calculPrixTotal(data[selectedItem].articles)
                                                }
                                            </td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>

                            <Modal
                                show={showModal}
                                onHide={() => setShowModal(false)}
                                dialogClassName="modal-90w"
                                aria-labellledby="example-custom-modal-styling-title">
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-custom-modal-styling-title">
                                        Ticket de caisse de la vente n°{data[selectedItem].id}
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Image fluid src={`data:image/png;base64,${data[selectedItem].imageBase64}`}/>
                                </Modal.Body>
                            </Modal>

                        </div>
                    )
                }


            </div>

            <Footer/>
        </div>
    )
}

export default Vente