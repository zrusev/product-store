import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { Row, Column } from 'rebass';
import Login from './login';
import Register from './register';
import Facebook from './facebook';
import Dashboard from './dashboard';
import ProtectedRoute from './protectedRoute';
import LogOut from './logout';
import Home from './home';

const Navigation = () => {
    const [authenticated, setAuthenticated] = useState(false);

    return (
        <Router>
            <div>
                <Row>
                    <Column>
                        <NavLink to="/">Home</NavLink>
                        {
                            authenticated 
                            ? (
                                <span>
                                    <NavLink to="/dashboard">Dashboard</NavLink>
                                    <LogOut />
                                </span>
                            ) : (
                                <span>
                                    <NavLink to="/login">Login</NavLink>
                                    <NavLink to="/register">Register</NavLink>
                                </span>
                            )
                        }
                    </Column>
                </Row>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={() => <Login />} />
                    <Route path="/register" component={Register} />
                    <Route path="/facebook" component={Facebook} />
                    <ProtectedRoute authenticated={authenticated} path="/dashboard" component={Dashboard} />
                </Switch>
            </div>
        </Router>
    );
}

export default Navigation;
