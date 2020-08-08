import React, { Fragment } from 'react'; //react
import { Switch, Route } from 'react-router-dom'; //rutas
import Homeview from './containers/homeview'; //home
import Navbar from '../../components/navbars/navbar';  //barra de navegacion
import Sidebar from '../../components/sidebars/sidebar'; //barra lateral
import './Student.css' //estilos
import { AuthService } from '../../services/Auth'; //autenticacion
import Cursosall from './containers/cursosall'; //para los cursos 
    
const Student = () => {
    const _sAuth = new AuthService(); //para la autenticacion
    return (
        <Fragment>
            <Navbar logout={_sAuth.logout} /> {/* Para cerrar sesion */}
            <main className="main">
                <Sidebar />
                <Switch>
                    <Route path='/student/cursos' component={Cursosall} /> {/* Ruta para los cursos */}
                    <Route path='/student' component={Homeview} /> {/* Ruta para el home */}
                </Switch>
            </main>
        </Fragment>
    )
}

export default Student
