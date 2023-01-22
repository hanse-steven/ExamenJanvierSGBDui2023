import React, {useEffect, useState} from 'react'
import Navigation from "../components/Navigation"
import {Table} from "react-bootstrap"
import axios from "axios"
import Footer from "../components/Footer"

const Client = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:8080/ords/db1/api/client")
            .then((res) => setData(res.data.items))
    }, [])

    return (
        <div>
            <Navigation/>

            <div className="row px-5 ajustHeight">
                <div className="col-md-12">
                    <Table striped>
                        <thead>
                        <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Prenom</th>
                            <th scope="col">Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data
                                .sort((a, b) => a.nomclient.localeCompare(b.nomclient))
                                .map((client, index) => (
                                    <tr key={index}>
                                        <td>{client.nomclient}</td>
                                        <td>{client.prenomclient}</td>
                                        <td><a href={`mailto:${client.emailclient}`}>{client.emailclient}</a></td>
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

export default Client