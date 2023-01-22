import React from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Vente from "./pages/Vente"
import Magasin from "./pages/Magasin"
import Client from "./pages/Client"
import Article from "./pages/Article"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/vente" element={<Vente/>}/>
                <Route path="/magasin" element={<Magasin/>}/>
                <Route path="/client" element={<Client/>}/>
                <Route path="/article" element={<Article/>}/>
                <Route path="*" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App