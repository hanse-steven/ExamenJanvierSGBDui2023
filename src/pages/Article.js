import React, {useEffect, useState} from 'react'
import Navigation from "../components/Navigation"
import {Table} from "react-bootstrap"
import axios from "axios"
import {formatageMonetaire} from "../divers/utils"
import Footer from "../components/Footer"

const Article = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:8080/ords/db1/api/article")
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
                            <th scope="col">Référence</th>
                            <th scope="col">Libellé</th>
                            <th scope="col">Prix Unitaire</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data
                                .sort((a, b) => a.nomarticle.localeCompare(b.nomarticle))
                                .map((article, index) => (
                                    <tr key={index}>
                                        <td>{article.numarticle}</td>
                                        <td>{article.nomarticle}</td>
                                        <td>{formatageMonetaire(article.prixarticle)}</td>
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

export default Article