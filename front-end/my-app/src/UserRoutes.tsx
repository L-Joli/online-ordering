import React from 'react';
import './scss/App.scss';
import Header from './Header';
import Menu from './Menu';
import Rewards from './Rewards';
import More from './More';
import Bag from './Bag';
import AddPayment from './AddPayment'
import { FaWallet, FaDoorOpen, FaCreditCard } from 'react-icons/fa';
import { FaGift } from 'react-icons/fa';
import { MdMoreHoriz } from 'react-icons/md';
import { FaShoppingBag } from 'react-icons/fa';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import Login from './Login';
import Register from './Register';
import LinkBar from './LinkBar';
import { Switch, Route } from 'react-router-dom';
import CafeLogin from './CafeLogin';
import PaymentList from './PaymentList';
import PreviousOrders from './PreviousOrders';
import CurrentOrders from './CurrentOrders';
import { PrivateRoute } from './PrivateRouteUser';

const UserRoutes: React.FC = () => {
    return (

        <div className="userRoutes">

            <div className="container App">

                <Switch>
                    <Route exact={true} path="/" >
                        <Header title="The Nest" h2="More than a cup" icon={null} home={true} />
                    </Route>
                    <Route  path="/menu" >
                        <Header title="The Nest" h2="More than a cup" icon={null} home={true} />
                    </Route>
                    <Route path="/orders" >
                        <Header title="Orders" h2={null} icon={<FaWallet />} home={null} />
                    </Route>
                    <Route path="/rewardsPage" >
                        <Header title="Rewards" h2={null} icon={<FaGift />} home={null} />
                    </Route>
                    <Route path="/rewards" >
                        <Header title="Rewards" h2={null} icon={<FaGift />} home={null} />
                    </Route>
                    <Route path="/more"  >
                        <Header title="More" h2={null} icon={<MdMoreHoriz />} home={null} />
                    </Route>
                    <Route path="/bag" >
                        <Header title="Bag " h2={null} icon={<FaShoppingBag />} home={null} />
                    </Route>
                    <Route path="/login" >
                        <Header title="Sign In" h2={null} icon={<FaDoorOpen />} home={null} />
                    </Route>
                    <Route path="/register" >
                        <Header title="Sign up" h2={null} icon={<AiOutlineUsergroupAdd />} home={null} />
                    </Route>
                    <Route path="/addpayment" >
                        <Header title="Payment Method" h2={null} icon={<FaCreditCard />} home={null} />
                    </Route>
                    <Route path="/payment_method" >
              <Header title="Payment Method" h2={null} icon={<FaCreditCard />} home={null} />
            </Route>
                </Switch>


                <div className="padding">
                    <div className="content">
                        <Switch>
                            <Route exact={true} path="/" component={Menu} />
                            <Route path="/menu" component={Menu} />
                            <PrivateRoute path="/orders/previous" component={PreviousOrders} />
                            <PrivateRoute path="/orders" component={CurrentOrders} />
                            <PrivateRoute path="/rewards" component={Rewards} />
                            <Route path="/more" component={More} />
                            <PrivateRoute path="/bag" component={Bag} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <PrivateRoute path="/addpayment" component={AddPayment} />
                            <PrivateRoute path="/payment_method" component={PaymentList} />
                            <Route path="/nestcafeLogin" component={CafeLogin} />
                        </Switch>
                    </div>
                </div>
                <LinkBar />

            </div>

        </div>
    );
}

export default UserRoutes;
