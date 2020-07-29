import React, { Fragment } from 'react'
import {Switch, Route, withRouter } from 'react-router-dom';
import HomeView from './containers/homeview';
import Navbar from '../../components/navbars/navbar';
import AddSilabus from './containers/addsilabus';
import NotFound from './containers/notfound';
import { AuthService } from '../../services/Auth';

const Teacher = (props) => {
    const _sAuth = new AuthService();
    return (
        <Fragment>
            <Navbar  logout={_sAuth.logoutTeacher} />
            <Switch>
                <Route path='/teacher/add' component={AddSilabus} />
                <Route path='/teacher' component={HomeView} />
                <Route path='*' component={NotFound} />
            </Switch>
        </Fragment>
    )
}

export default withRouter(Teacher)
