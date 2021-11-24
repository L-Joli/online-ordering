import React, { useEffect } from 'react';
import './scss/Orders.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './redux/store';
import { loadCurrentOrdersThunk } from './redux/OrderPage/thunk';
import CustomerOrders from './Orders';
// import { FaHeart } from 'react-icons/fa';


const CurrentOrders: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCurrentOrdersThunk());
  }, [dispatch])

  const customerOrders = useSelector((state: IRootState) => state.orderPage.customerOrders)

  return (

    <div className="customerOrders">

        <CustomerOrders customerOrders={customerOrders} />
      {/* {customerOrders.map(customerOrder =>
        <div className="ordersWrap">
          <div className="row">
          <FaHeart className="heart" />
            <div className="col-2">
              <div className="customerOrderId">{customerOrder.id}</div>
            </div>
            <div className="col-8">
              {customerOrder.details.map(detail =>
                <div className="item">
                  <div className="orderOptionDetails">
                    <div className="orderProduct">{detail.product}</div>
                    <div className="orderQuantity">x {detail.quantity}</div>
                  </div>
                  <div className="orderOption">{detail.option}</div> */}


                  {/* <div className="unitPrice">$ {(parseInt(detail.productPrice.slice(0,2))+parseInt(detail.extraCharge.slice(0,2)))}</div> */}
                {/* </div>

              )}
            </div>
            <div className="col-2">
              <div className="amount">
                HKD {customerOrder.amount.slice(0, 2)}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="orderDate">{new Date(customerOrder.taken_time).toLocaleString().slice(0, 10)} {new Date(customerOrder.taken_time).toLocaleString().slice(12, 17)}</div>
            </div>
          </div>


        </div>
      )} */}


    </div>
  );
}


export default CurrentOrders;
