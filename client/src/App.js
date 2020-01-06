import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, Navigation } from './views';
import ProtectedRoute from './components/protectedRoute';
import { history } from './helpers';

const App = () => {
  return (
    <div className="jumbotron">
      <div className="container">
        <div className="col-sm-8 col-sm-offset-2">
          <Router history={history}>
            <Navigation />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <ProtectedRoute path="/dashboard" component={RegisterPage} />
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
