import React, { Fragment } from 'react' //react
import {Switch, Route, withRouter } from 'react-router-dom'; //switch,rutas e historial 
import HomeView from './containers/homeview'; //home
import Navbar from '../../components/navbars/navbar'; //barra de navegacion
import AddSilabus from './containers/addsilabus'; //para añadir el silabo
import NotFound from './containers/notfound'; //not found
import { AuthService } from '../../services/Auth'; //autenticacion

const Teacher = (props) => {
    const _sAuth = new AuthService();//para la autenticacion
    return (
        <Fragment>
            <Navbar  logout={_sAuth.logoutTeacher} /> {/*Cerrar sesion de docente */}
            <Switch>
                <Route path='/teacher/add' component={AddSilabus} /> {/*Ruta para añadir el silabo */}
                <Route path='/teacher' component={HomeView} /> {/*Ruta para el home */}
                <Route path='*' component={NotFound} /> {/* Not found */}
            </Switch>
        </Fragment>
    )
}

export default withRouter(Teacher)
