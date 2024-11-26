import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom'

const Error404Page = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1>Error 404</h1>
            <p>La página que buscas no existe</p>
            <button
                className="btn btn-primary"
                onClick={() => navigate("/")}
            >
                Volver al inicio
            </button>
        </div>
    )
}

export default Error404Page