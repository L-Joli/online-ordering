import React, { useState } from 'react';
import './scss/Cafe.scss';
import './scss/CafeMain.scss';
import { FaCheckCircle } from 'react-icons/fa';
import { Order } from './redux/Cafe/state';
import { Collapse, Button } from 'reactstrap';
import moment from 'moment';

interface ICafeContentProps {
    title: string;
    orders: Order[];
    checkedOrder?: (orderId: number) => void;
}

const CafeContent: React.FC<ICafeContentProps> = (props) => {
    
    const [isOpenIds, setIsOpenIds] = useState<number[]>([]);

    const toggle = (orderId: number) => {

        // const { isOpenIds } = this.state;
        // const isOpenIds = this.state.isOpenIds;

        
        if (isOpenIds.includes(orderId) ) {
           setIsOpenIds(
               isOpenIds.filter( (id) => id !== orderId)
            );
        } else {
            setIsOpenIds(
            isOpenIds.concat([orderId])
            )
        }
        // setIsOpen(!isOpen);
    }

    return (
        <>


            <p>
                {props.title}
            </p>

            {props.orders.map(order =>
                <div className="cafeOrders" key={order.id}>
                    <div className="order row" >

                        <div className="col-1 orderId">
                            {order.id}
                        </div>

                        <div className="col-10 details" onClick={() => toggle(order.id)} >

                            <div className="name">{order.user}</div>
                            
                            <div className="time">{moment(order.taken_time).format("DD MMM YYYY")}
                            <div className="timeMargin">{moment(order.taken_time).format("hh:mm A")}</div>
                            </div>

                        </div>

                        {
                            props.checkedOrder ?
                                <div className="col-1 ok" onClick={() => props.checkedOrder && props.checkedOrder(order.id)}> 
                                {props.title==="Current Orders" ? <FaCheckCircle />:<Button>Delivered</Button>} </div> :
                                <div className="col-1 amount">$ {order.amount}</div>
                        }
                    </div>
                    <Collapse className="orderDetails" isOpen={isOpenIds.find((id) => id === order.id) ? true : false}>
                        <div >
                            {order.details.map(detail =>
                                <div className="info" key={detail.id}>

                                    <div className="wrap">
                                        <div className="col-1 quantity"> {detail.quantity}</div>
                                        <div className="col-11 product"> {detail.product}</div>
                                    </div>
                                    <div className="wrap">
                                        <div className="col-1"></div>
                                        <div className="col-12 detailoption">
                                        {detail.options.map(option =><div> {option.option}</div>)}
                                        </div>
                                    </div>
                                </div>

                            )}
                        </div>
                    </Collapse> 
                   

                </div>


            )}


        </>



    );
}

export default CafeContent;