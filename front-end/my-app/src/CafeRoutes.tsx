import React from 'react';
import './scss/Cafe.scss';
import { Switch, Route, Link } from 'react-router-dom';
import CafeLogin from './CafeLogin';
import CafeMain from './CafeMain';
import CafeDone from './CafeDone';
import CafePastOrders from './CafePastOrders';
import { PrivateRoute } from './PrivateRoute';

interface ICafeRoutesProps {
    match: {
        path: string
    }
};

const CafeRoutes: React.FC<ICafeRoutesProps> = (props) => {
    return (

        <div className="cafeRoutes">
            {localStorage.getItem('token') ?
                <div className="heading">
                    <div className="col-4"></div>
                    <div className="col-4"><div className="theNest">The Nest</div></div> 
                    <div className="col-4 logout">
                        <Link className="logoutLink" to={`${props.match.path}/`} onClick={()=>localStorage.removeItem("token")}>Logout</Link>
                    </div>

                </div> 
                :
                <div className="heading">
                    <div className="col-4"></div>
                    <div className="col-4"><div className="theNest">The Nest</div></div>
                    <div className="col-4 logout"></div>
                </div>}


            <Switch>
                <PrivateRoute path={`${props.match.path}/currentOrders`} component={CafeMain} />
                <PrivateRoute path={`${props.match.path}/done`} component={CafeDone} />
                <PrivateRoute path={`${props.match.path}/pastOrders`} component={CafePastOrders} />
                <Route path={`${props.match.path}/`} exact={true} component={CafeLogin} />
            </Switch>


        </div>



    );
}

export default CafeRoutes;
