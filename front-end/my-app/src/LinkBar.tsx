import React from 'react';
import { FaMugHot } from 'react-icons/fa';
import { FaWallet } from 'react-icons/fa';
import { FaGift } from 'react-icons/fa';
import { MdMoreHoriz } from 'react-icons/md';
import { FaShoppingBag } from 'react-icons/fa';
import './scss/App.scss';
import './scss/LinkBar.scss';
import { NavLink } from 'react-router-dom';
import { IRootState, ThunkDispatch } from './redux/store';
import { connect } from 'react-redux';
import { CustomerOrder } from './redux/OrderPage/state';
import { loadBagThunk } from './redux/bag/thunk';
import { loadCurrentOrdersThunk } from './redux/OrderPage/thunk';

interface LinkBarProps {
  bags: CustomerOrder[];
  isAuthenticated: boolean | null;
  loadBagItems: () => void;
  customerOrders: CustomerOrder[];
  loadFinished: ()=>void;
}

const LinkBar: React.FC<LinkBarProps> = (props) => {
  return (

    <div className="flex">

      <NavLink className="link" activeClassName="active" to="/menu">
        <div className="font"><FaMugHot /></div><p>Menu</p>
      </NavLink>
      <NavLink className="link" activeClassName="active" to="/orders">
        <div className="font">
        {props.customerOrders && props.isAuthenticated && props.customerOrders.map(customerOrder => 
         customerOrder.finished===true?<div className="alertStatus" key ={customerOrder.id}>!</div> : <div></div>)}
         {/* <div className="alertStatus">!</div> : <div></div>} */}
          <FaWallet /></div><p>Orders</p>
      </NavLink>
      <NavLink className="link" activeClassName="active" to="/rewards">
        <div className="font"><FaGift /></div><p>Rewards</p>
      </NavLink>
      <NavLink className="link" activeClassName="active" to="/more">
        <div className="font"><MdMoreHoriz /></div><p>More</p>
      </NavLink>
      <NavLink className="link" activeClassName="active" to="/bag">
        <div className="font">
          {props.bags.length !== 0 && props.isAuthenticated === true ? <div className="orderCount">{props.bags[0].details.length}</div> : <div></div>}
          <FaShoppingBag />
        </div><p>Bag</p>
      </NavLink>

    </div>

  );
}

const mapStateToProps = (state: IRootState) => {
  return {
    bags: state.bag.bags,
    isAuthenticated: state.auth.isAuthenticated,
    customerOrders: state.orderPage.customerOrders
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch) => {
  return {
    loadBagItems: () => dispatch(loadBagThunk()),
    loadFinished:() => dispatch(loadCurrentOrdersThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkBar);
