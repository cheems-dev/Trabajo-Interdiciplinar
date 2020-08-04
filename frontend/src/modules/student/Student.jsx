import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Homeview from './containers/homeview';
import Navbar from '../../components/navbars/navbar';
import Sidebar from '../../components/sidebars/sidebar';
import './Student.css'
import { AuthService } from '../../services/Auth';
import Cursosall from './containers/cursosall';
    
const Student = () => {
    const _sAuth = new AuthService();
    return (
        <Fragment>
            <Navbar logout={_sAuth.logout} />
            <main className="main">
                <Sidebar />
                <Switch>
                    <Route path='/student/cursos' component={Cursosall} />
                    <Route path='/student' component={Homeview} />
                </Switch>
            </main>
        </Fragment>
    )
}

export default Student
