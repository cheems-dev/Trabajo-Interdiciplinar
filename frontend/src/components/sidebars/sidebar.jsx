import React from 'react'
import './css/sidebar.css'
import { Link } from 'react-router-dom'//para usar links de referencia

const sidebar = () => {//barra lateral para el perfil y los cursos
    return (
        <div className="sidebar" >
            <Link to='/student' >Perfil</Link>
            <Link to='/student/cursos' >Cursos</Link>
        </div>
    )
}

export default sidebar
