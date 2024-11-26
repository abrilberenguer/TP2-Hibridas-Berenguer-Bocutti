import React,{ useEffect, useState } from 'react'
import ListadoDestinos from '../components/Destinos/ListadoDestinos'
import * as serviceDestinos from '../services/destinos.service'

const Home = () => {
    const [destinos, setDestinos] = useState([])

    useEffect( () => {
        serviceDestinos.getDestinos()
        .then( destinos => {
            setDestinos(destinos)
        })
    },[] )

    return (
        <ListadoDestinos listado={destinos} />
    )
}

export default Home