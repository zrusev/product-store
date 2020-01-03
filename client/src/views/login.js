import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Flex, Box, Input, Button, Subhead, Text } from 'rebass';
import accountService from '../services/accountService';

const Login = (props) => {
    const initialState = {
        email: '',
        password: '',
        error: ''
    };

    const [state, setState] = useState(initialState);

    const service = new accountService();

    const handleInputChange = (event) => {
        event.persist();
        
        setState(inputs => ({
            ...inputs, 
            [event.target.name]: event.target.value 
        }));
    };
    
    const handleSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }

        const { email, password } = state;
        const credentials = { email, password };
        
        try {
            const result = await service.login(credentials);
            
            if (!result.success) {
                let errors = '';

                if(result.message) {
                    errors = result.message;
                }

                if (result.errors) {                       
                    errors = Object.values(result.errors.map(d => d.description)).join('\n');
                }

                throw new Error(errors);
            }

            window.localStorage.setItem('auth_token', result.token);
            props.history.push("/");
        } catch (error) {
            console.log(error);
        }

    }

      const { email, password, error } = state;

      return (
        <Container>
          <Flex>
            <Box>
              <Subhead>Log In</Subhead>
            </Box>
          </Flex>
          {error ? (
            <Flex>
              <Box>
                <Text>{error.message}</Text>
              </Box>
            </Flex>
          ) : null}
          <Flex>
            <Box>
              <form onSubmit={handleSubmit}>
                <Input type="text" name="email" placeholder="Email" value={email} onChange={handleInputChange} />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleInputChange}
                />
                <Button children="Log In" />
              </form>
            </Box>
          </Flex>
        </Container>
      );
}

export default withRouter(Login);