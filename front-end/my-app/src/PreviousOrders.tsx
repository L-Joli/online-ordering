import React from 'react';
import './scss/App.scss';
import './scss/Orders.scss';
import {  connect } from 'react-redux';
import { IRootState, ThunkDispatch } from './redux/store';
import CustomerOrders from './Orders';
import { loadPreviousOrdersThunk, reOrderThunk } from './redux/OrderPage/thunk';
import { CustomerOrder } from './redux/OrderPage/state';

interface IPreviousProps{
  pastOrders:CustomerOrder[];
  loadPreviousOrdersThunk: () => void;
  reOrder: (orderId:number) => void;
}


class PreviousOrders extends React.Component<IPreviousProps, {}>{

  
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadPreviousOrdersThunk());
  // }, [dispatch])

  // const customerOrders = useSelector((state: IRootState) => state.orderPage.customerOrders)

  private reOrder = (orderId: number) => {
    this.props.reOrder(orderId);
}

componentDidMount(){
  this.props.loadPreviousOrdersThunk();
}



render(){
  return (

    <div className="orders">
      <CustomerOrders customerOrders={this.props.pastOrders} reOrder={this.reOrder} />


    </div>
  );
}
 
}


const mapStateToProps = (state: IRootState) => {
  return {
    pastOrders: state.orderPage.pastOrders,

  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch) => {
  return {
    loadPreviousOrdersThunk: () => dispatch(loadPreviousOrdersThunk()),
    reOrder:(orderId:number) => dispatch(reOrderThunk(orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviousOrders);

