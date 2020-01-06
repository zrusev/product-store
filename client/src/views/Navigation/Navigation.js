import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LogOutPage } from '../index';

export const Navigation = () => {
    const { loggedIn } = useSelector(state => state.authentication);
    const [authenticated, setAuthenticated] = useState(loggedIn);

    useEffect(() => {
        setAuthenticated(loggedIn);
    },[loggedIn]);

    return (
        <nav className="navbar navbar-default">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="nav navbar-nav">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    {
                        authenticated 
                        ? (
                            <>
                                <li>
                                    <NavLink to="/dashboard">Dashboard</NavLink>
                                </li>
                                <li>
                                    <LogOutPage />
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/register">Register</NavLink>
                                </li>
                            </>
                        )
                    }        
                </ul>
            </div>
        </nav>
    );
}