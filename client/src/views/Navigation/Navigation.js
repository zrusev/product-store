import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LogOutPage } from '../index';

export const Navigation = () => {
    const loggedIn = useSelector(state => state.authentication.loggedIn);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        if(loggedIn !== auth) {
            setAuth(loggedIn);
        }
    }, [auth, loggedIn])

    return (
        <nav className="navbar navbar-default">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="nav navbar-nav">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    {
                        auth
                        ?
                        <>
                            <li>
                                <NavLink to="/dashboard">Dashboard</NavLink>
                            </li>
                            <li>
                                <LogOutPage />
                            </li>
                        </>
                        : 
                        <>
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/register">Register</NavLink>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    );
}