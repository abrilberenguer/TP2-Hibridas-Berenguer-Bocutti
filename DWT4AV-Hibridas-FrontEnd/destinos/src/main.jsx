import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"

import Login from './components/Login/Login.jsx'
import Register from './components/Login/Register.jsx'
import Home from './pages/Home.jsx'
import Layout from './components/Layout/Layout.jsx'
import DetalleDestino from './components/Destinos/DetalleDestino.jsx'
import Logout from './components/Login/Logout.jsx'
import Error404Page from './pages/Error404Page.jsx'
import Perfil from './components/Perfil/Perfil.jsx'
import ListadoGuias from './components/GuiasTuristicas/ListadoGuias.jsx'
import DetalleGuia from './components/GuiasTuristicas/DetalleGuia.jsx'
import ListadoEventos from './components/Eventos/ListadoEventos.jsx'
import DetalleEvento from './components/Eventos/DetalleEvento.jsx'
import PerfilEditar from './components/Perfil/PerfilEditar.jsx'

const router = createBrowserRouter([
  {
  element: <Layout />,
  errorElement: <Error404Page />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/destino/:id",
      element: <DetalleDestino />,
    },
    {
      path: "/perfil",
      element: <Perfil />,
    },
    {
      path: "/editar-perfil",
      element: <PerfilEditar />,
    },
    {
      path: "/guias",
      element: <ListadoGuias />,
    },
    {
      path: "/guias/:guiaId",
      element: <DetalleGuia />,
    },
    {
      path: "/eventos",
      element: <ListadoEventos />,
    },
    {
      path: "/eventos/:eventoId",
      element: <DetalleEvento />,
    },
  ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
