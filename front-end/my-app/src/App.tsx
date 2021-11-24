import React, { useEffect } from 'react';
import './scss/App.scss';
import { ConnectedRouter } from 'connected-react-router';
import { history, IRootState } from './redux/store';
// import { StripeProvider, Elements } from 'react-stripe-elements'
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect, useDispatch } from 'react-redux';
import { restoreLogin } from './redux/auth/thunk';
import UserRoutes from './UserRoutes';
import CafeRoutes from './CafeRoutes';
import { Switch, Route } from 'react-router';
//import { PrivateRoute } from './PrivateRoute';
const App: React.FC<{
  isAuthenticated: boolean | null
}> = (props) =>{
  const dispatch = useDispatch();
  //componentDidMount
  useEffect(() => {
    if (props.isAuthenticated === null) {
      dispatch(restoreLogin());
    }
  }, [dispatch, props.isAuthenticated]);

  if (props.isAuthenticated === null) {
    return <div>Loading... </div>
  } else {

  return (
   
  
    <ConnectedRouter history={history}>
 

            <Switch>
                <Route path="/nestcafestaffAdmin"  component={CafeRoutes} />
                <Route path="/" component={UserRoutes} />
            </Switch>

    </ConnectedRouter>

  );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(App);
