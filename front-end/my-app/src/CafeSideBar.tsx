import React from 'react';
import './scss/Cafe.scss';
import './scss/CafeMain.scss';
import { NavLink } from 'react-router-dom';



const CafeSideBar: React.FC = () => {
    return (




            <div className="sideBar">

                <NavLink className="btns" activeClassName="activeBtn" to="/nestcafestaffAdmin/currentOrders"> <p>Current Orders</p> </NavLink>
                <NavLink className="btns" activeClassName="activeBtn" to="/nestcafestaffAdmin/done">  <p>Finished</p> </NavLink>
                <NavLink className="btns" activeClassName="activeBtn" to="/nestcafestaffAdmin/pastOrders"> <p>Past Orders</p>  </NavLink>


            </div>
           


    );
}

export default CafeSideBar;