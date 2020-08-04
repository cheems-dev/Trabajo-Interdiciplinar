import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import HomeView from '../pages/homeview';
import Student from '../modules/student/Student';
import Teacher from '../modules/teacher/Teacher';
import { AuthService } from '../services/Auth';
import Chekinstudent from '../pages/chekinstudent';
import Checkinteacher from '../pages/Checkinteacher';

const App = () => {

    const _sAuth = new AuthService();
    let role = localStorage.getItem('role')

    return (
        <Router>
            <Switch>
                <Route path='/teacher'>
                    {
                        !_sAuth.isLoggedTeacher() ? <Redirect from='/teacher' to='/'  /> : <Teacher /> 
                    }
                </Route>
                <Route path='/student'>
                    {
                        !_sAuth.isLogged() ? <Redirect from='/student' to='/' exact /> : <Student /> 
                    }
                </Route>
                <Route path="/checkin-teacher" >
                    { _sAuth.isLoggedTeacher() ? <Redirect from='/checkin-teacher' to='/teacher' /> : <Checkinteacher /> }
                </Route>

                <Route path="/checkin-student" >
                    { _sAuth.isLogged() ? <Redirect from='/checkin-student' to='/student' /> : <Chekinstudent /> }
                </Route>
                

                <Route path='/' render={() => {
                    if(role === "STUDENT_ROLE") {
                        if(_sAuth.isLogged()){
                            return <Redirect to="/student" />
                        }else {
                            return <HomeView />
                        }
                    }
                    if(role === "TEACHER_ROLE") {
                        if(_sAuth.isLoggedTeacher()){
                            return <Redirect to="/teacher" />
                        }else {
                            return <HomeView />
                        }
                    } 
                    if(role === null) {
                        return <HomeView />
                    }
                }} />
            </Switch>
        </Router>
    )
}

export default App



