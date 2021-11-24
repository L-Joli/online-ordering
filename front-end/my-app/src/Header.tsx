import React from 'react';
import './scss/App.scss';
import './scss/Header.scss';
import { NavLink } from 'react-router-dom';


interface IHeaderProps {
  icon: {} | null;
  title: string;
  h2: string | null;
  home: boolean | null;
}

const Header: React.FC<IHeaderProps> = (props) => {
  return (

  
        <div className={"header" + (props.home ? " firstPage" : "")}>
          <div className="icon">{props.icon}</div>
          <div className="header-title">{props.title}</div>
          <h2>{props.h2}</h2>
          {props.title === "Orders" ? <div className="orderBtns">
            <NavLink exact={true} activeClassName="orderActive" className="orderBar" to="/orders">Current</NavLink>
            <NavLink activeClassName="orderActive" className="orderBar" to="/orders/previous">Past</NavLink>
          </div>: ""}
        </div>
 
  );
}

export default Header;
