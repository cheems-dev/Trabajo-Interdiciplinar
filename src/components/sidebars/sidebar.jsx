import React from 'react'
import './css/sidebar.css'
import { Link } from 'react-router-dom'

const sidebar = () => {
    return (
        <div className="sidebar" >
            <Link to='/student' >Perfil</Link>
            <Link to='/student/cursos' >Cursos</Link>
        </div>
    )
}

export default sidebar
