import React from 'react';
import './scss/App.scss';
import './scss/Bag.scss';
import { IRootState } from './redux/store';
import { connect } from 'react-redux';
// import { Row, Col } from 'reactstrap';

interface ICheckOutProps {
  total: number | undefined;
  pay:(selectedCard:string)=> void;
  selectedCard: string;
}

class CheckOut extends React.Component<ICheckOutProps, {}>{

  

  render() {
    return (
      <div className="container-fluid check-out">
        <div className="bag-bottom">

          <div className="price">HKD {this.props.total}</div>
          <div className="pay-btn" onClick={()=>this.props.pay(this.props.selectedCard)}>Pay</div>
        </div>
      </div>
    )
  };
}



const mapStateToProps = (state: IRootState) => {
  return {
      selectedCard: state.order.selectedCard,
      
  }
}


export default connect(mapStateToProps)(CheckOut);
