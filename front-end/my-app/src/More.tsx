import React from 'react';
import './scss/App.scss';
import './scss/More.scss';
// import { StripeProvider, Elements } from 'react-stripe-elements';
// import Form from './Form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch } from './redux/store';
import { logoutThunk } from './redux/auth/thunk';
import { FaMoneyCheckAlt, FaGift } from 'react-icons/fa';
import { GoSignOut, GoSignIn } from 'react-icons/go';



interface IMoreProps {
  logout: () => void;
}


class More extends React.Component<IMoreProps, {}>{

  private logout = () => {
    this.props.logout();
  }

  public render() {
    return (

      <div className="more">

        <div className="more-btn">
          <Link className="more-link" to="/payment_method"><FaMoneyCheckAlt className="icon-more payment"/>Payment Method</Link>
        </div>


        <div className="more-btn">
          <Link className="more-link" to="/rewards"><FaGift className="icon-more rewards"/>Rewards Points</Link>
        </div>


     {localStorage.getItem('token')?
    <div className="more-btn" onClick={() => this.logout()}>
    <Link className="more-link" to="/logout"><GoSignOut className="icon-more signout"/>Sign Out</Link>
  </div>:
   <div className="more-btn" onClick={() => this.logout()}>
   <Link className="more-link" to="/login"><GoSignIn className="icon-more signout"/>Sign In</Link>
 </div>
    }
          
       
      </div>
    );

  }

}

const mapDispatchToProps = (dispatch: ThunkDispatch) => {
  return {
    logout: () => { dispatch(logoutThunk()) }
  }
}

export default connect(/*mapStateToProps,*/null, mapDispatchToProps)(More);


