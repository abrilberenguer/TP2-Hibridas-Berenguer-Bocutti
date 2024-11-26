import React, { useState, useEffect } from 'react'

const FetchList = () => {
    const [listado, setListado] = useState([])
    const [ page, setPage ] = useState(1)
    const getDatos = async(uri) => {
    const response = await fetch(uri)
    const datos = await response.json()
    setListado( datos )
    console.log( datos )
    }

    useEffect( () => {
    return () => {
        console.log("UnMount")
    }
    }, [page] )

    const paginaSiguiente = () => {
    setPage( page + 1 )
    }

    const paginaAnterior = () => {
    if( page > 1 ) setPage( page - 1 )
    }


    return (
    <>
        <button onClick={ paginaAnterior } >  Anterior {page} </button>
        <button onClick={ paginaSiguiente } >  Siguiente {page} </button>
        <ul>
        {
            listado.map( (destino, indice) => {
                return <li key={indice} >{destino.lugar}</li>
            } )
        }
        </ul>
    </>
    )
}

export default FetchList