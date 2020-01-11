import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../actions';
import { history } from '../../helpers';

export const RegisterPage = props => {
    const dispatch = useDispatch();

    const initialState = { email: '', password: ''};
    const [state, setState] = useState(initialState);

    useEffect(() => {
      dispatch(userActions.logout());
    }, [dispatch]);

    const handleInputChange = event => {
      event.persist();
        
      setState(inputs => ({
          ...inputs, 
          [event.target.name]: event.target.value 
      }));
    };

    const handleSubmit = event => {
      if (event) {
        event.preventDefault();
      }

      const { email, password } = state;
      
      if (email && password) {
        dispatch(userActions.register(email, password));

        history.push("/");
      }
    };
    
    const { email, password } = state;
     
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
          <form name="form" onSubmit={handleSubmit}>
            <div className={'form-group'}>
              <label htmlFor="email">E-mail</label>
              <input 
                className="form-control"
                type="text" 
                name="email" 
                placeholder="Email" 
                value={email} 
                onChange={handleInputChange}
              />
            </div>
            <div className={'form-group'}>
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
      </div>
    );
}