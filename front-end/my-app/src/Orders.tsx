import React, { useEffect, useState } from 'react';
import './scss/Orders.scss';
import { CustomerOrder } from './redux/OrderPage/state';
import { Badge, Button } from 'reactstrap';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { loadCurrentOrdersThunk } from './redux/OrderPage/thunk';
import socketIOClient from 'socket.io-client';



interface IOrderProps {
  customerOrders: CustomerOrder[];
  reOrder?: (orderId: number) => void;
}


const CustomerOrders: React.FC<IOrderProps> = (props) => {
  const [point] = useState(`${process.env.REACT_APP_API_SERVER}`);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(loadCurrentOrdersThunk());
    const socket = socketIOClient(point);
    // this.send();
    socket.on('status', (msg: string) => {
      //  console.log(msg) 
      dispatch(loadCurrentOrdersThunk());
    })
    socket.on('delivered', (msg: string) => {
      //  console.log(msg) 
      dispatch(loadCurrentOrdersThunk());
    })

  }, [dispatch,point])

  // const customerOrders = useSelector((state: IRootState) => state.orderPage.customerOrders)

  return (

    <div className="customerOrders">
      {props.customerOrders && props.customerOrders.map(customerOrder =>
        <div className="ordersWrap" key={customerOrder.id} >
          <div className="row bottomMargin">
            <div className="col-12 col-md-2">
              <div className="customerOrderId"># {customerOrder.id}</div>
            </div>
            <div className="col-12 col-md-6">
              {customerOrder.details.map(detail =>
                <div className="item" key={detail.id}>
                  <div className="orderOptionDetails">
                    <div className="orderProduct">{detail.product}</div>
                    <Badge className="orderQuantity">{detail.quantity}</Badge>
                  </div>
                  <div className="orderOption">{detail.options.map(option => <div key={option.id}> {option.option}</div>)}</div>


                  {/* <div className="unitPrice">$ {(parseInt(detail.productPrice.slice(0,2))+parseInt(detail.extraCharge.slice(0,2)))}</div> */}
                </div>

              )}
            </div>
            <div className="col-12 col-md-4">
              <div className="amount">
                <div className="total">TOTAL:</div> HKD {customerOrder.amount}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="orderDate">{moment(customerOrder.taken_time).format("DD MMM YYYY")}<div className="time">{moment(customerOrder.taken_time).format("hh:mm A")}</div>
              </div>
            </div>
          </div>
          {props.reOrder ? "" : <div className="status"> Status<span>:</span>
                  {customerOrder.finished !== true ? <div className="pending"> Pending</div> : <div className="Finished"> Finished</div>}</div>}
          {
            props.reOrder ?
              <Button className="reorderBtn" onClick={() => (props.reOrder && props.reOrder(customerOrder.id))}>Reorder</Button>
              :
              ""
          }

        </div>
      )}


    </div>
  );
}



export default CustomerOrders;
