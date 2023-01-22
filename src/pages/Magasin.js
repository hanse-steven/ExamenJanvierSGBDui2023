import React, {useEffect, useState} from 'react'
import Navigation from "../components/Navigation"
import {Card, Form, Table} from "react-bootstrap"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import Footer from "../components/Footer"

const Magasin = () => {
    const [data, setData] = useState([])

    const loadData = () => {
        axios
            .get('http://localhost:8080/ords/db1/api/magasin')
            .then((res) => {
                setData(res.data.items)
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let form = event.target
        let body = {
            "id": data[form.selectedmg.value].idmagasin,
            "cp": form.codepostalmg.value
        }

        axios
            .post('http://localhost:8080/ords/db1/api/magasin', body)
            .then((res) => {
                if (typeof res.data['erreur'] !== 'undefined') {
                    toast.error(res.data['erreur'],{
                        duration: 5000,
                            position: 'bottom-center'
                    })
                }
                else {
                    loadData()
                    toast.success("Mise à jour réussie !",{
                        duration: 5000,
                        position: 'bottom-center'
                    })
                }
                setShowToast(true)


            })
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <Toaster />

            <Navigation/>

            <div className="row px-5 ajustHeight">
                <div className="col-lg-4 pb-xs-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Magasin</Card.Title>
                            <Card.Text as="div">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Selectionner un magasin</Form.Label>
                                        <Form.Select required name="selectedmg">
                                            {
                                                data.length > 0 &&
                                                data
                                                    .sort((a, b) => a.idmagasin - b.idmagasin)
                                                    .map((magasin, index) => (
                                                        <option key={index}
                                                            value={index}>{magasin.idmagasin} - {magasin.nommagasin} - {magasin.codepostal}</option>
                                                    ))
                                            }</Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Code Postal</Form.Label>
                                        <Form.Control type="number" min="1000" max="9999" required name="codepostalmg"/>
                                    </Form.Group>
                                    <input className="btn btn-primary" type="submit"
                                           value="Mettre à jour le code postal"/>
                                </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-lg-8">
                    <Table striped>
                        <thead>
                        <tr>
                            <th scope="col">Libellé</th>
                            <th scope="col">Prix Unité</th>
                            <th scope="col">Prix Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data
                                .sort((a, b) => a.idmagasin - b.idmagasin)
                                .map((magasin, index) => (
                                    <tr key={index}>
                                        <td>{magasin.idmagasin}</td>
                                        <td>{magasin.nommagasin}</td>
                                        <td>{magasin.codepostal}</td>
                                    </tr>
                                ))
                        }
                        </tbody>
                    </Table>
                </div>
            </div>

            <Footer/>
        </div>
    )


}

export default Magasin