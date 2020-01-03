import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Flex, Box, Input, Button, Subhead, Text } from 'rebass';
import accountService from '../services/accountService';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: '',
        }
    }

    static service = new accountService();

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { email, password } = this.state;
        const credentials = { email, password };

        this.setState({
            error: ''
        }, async () => {
            try {
                const result = await Register.service.register(credentials);
                
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
            } catch (error) {
                this.setState({
                    error: error.message
                })
            }
        });
      };

    render() {
      const { email, password, error } = this.state;
      
      return (
        <Container>
          <Flex>
            <Box>
              <Subhead>Register</Subhead>
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
              <form onSubmit={this.handleSubmit}>
                <Input type="text" name="email" placeholder="Email" value={email} onChange={this.handleInputChange} />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleInputChange}
                />
                <Button children="Register" />
              </form>
            </Box>
          </Flex>
        </Container>
      );
    }
}

export default withRouter(Register);