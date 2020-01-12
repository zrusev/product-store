import React, { useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, DashboardPage, Navigation } from './views';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { history } from './helpers';
import { useSelector, useDispatch } from 'react-redux';
import { alertActions } from './+store/actions';

const App = () => {
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }, [dispatch]);

  return (
    <div className="jumbotron">
      <div className="container">
        <div className="col-sm-8 col-sm-offset-2">
          {
            alert.message && 
            alert.message.map(message => <div key={message.code} className={`alert ${alert.type}`}>{message.description}</div>)
          }
        </div>
        <div className="col-sm-8 col-sm-offset-2">
          <Router history={history}>
            <Navigation />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <ProtectedRoute path="/dashboard" component={DashboardPage} />
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
