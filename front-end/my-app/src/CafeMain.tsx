import React from 'react';
import './scss/Cafe.scss';
import './scss/CafeMain.scss';
import { connect } from 'react-redux';
import { ThunkDispatch, IRootState } from './redux/store';
import { loadCurrentOrdersThunk, finishOrderThunk } from './redux/Cafe/thunk';
import { Order } from './redux/Cafe/state';
import CafeSideBar from './CafeSideBar';
import CafeContent from './CafeContent';
import socketIOClient from 'socket.io-client';


interface ICafeMainProps {
    orders: Order[];
    loadCurrentOrdersThunk: () => void;
    finishOrderThunk: (orderId: number) => void;
};

interface IState {
    isOpenIds: number[];
    endpoint: string;
};

class CafeMain extends React.Component<ICafeMainProps, IState>{

    constructor(props: ICafeMainProps) {
        super(props);
        this.state = { 
            isOpenIds: [],
            endpoint: `${process.env.REACT_APP_API_SERVER}`
        };
    }


    // const [isOpen, setIsOpen] = useState(false);



    componentDidMount() {
        this.props.loadCurrentOrdersThunk();
        const socket = socketIOClient(this.state.endpoint);
        // this.send();
        socket.on('users paid', (msg: string) => {
          //  console.log(msg) 
          this.props.loadCurrentOrdersThunk();
        })
    }

    // componentDidUpdate() {
    //     this.props.loadCurrentOrdersThunk();
    // }

    
    // toggle = (orderId: number) => {

    //     const { isOpenIds } = this.state;
    //     // const isOpenIds = this.state.isOpenIds;

    //     if (isOpenIds.includes(orderId) ) {
    //         this.setState({
    //             isOpenIds: this.state.isOpenIds.filter( (id) => id !== orderId)
    //         });
    //     } else {
    //         this.setState({ isOpenIds: this.state.isOpenIds.concat([orderId]) })
    //     }
    //     // setIsOpen(!isOpen);
    // }

    private checkedOrder = (orderId: number) => {
        this.props.finishOrderThunk(orderId);
    }



    public render() {

        return (

            <div className="cafeMain">


                <CafeSideBar />
                <div className="cafeContent">
                    {/* 
                    <p>
                        Current Orders
                    </p> */}
                    <CafeContent title="Current Orders" orders={this.props.orders} checkedOrder={this.checkedOrder} />

                    {/* {this.props.orders.map(order =>
                        <div className="cafeOrders" key={order.id}>
                            <div className="order row" >

                                <div className="col-1 orderId">
                                    {order.id}
                                </div>

                                <div className="col-10 details" onClick={()=>this.toggle(order.id)} >

                                    <div className="name">{order.user}</div>
                                    <div className="time">{order.taken_time}</div>

                                </div>

                                <div className="col-1 ok" onClick={() => this.checkedOrder(order.id)}> <FaCheckCircle /> </div>



                            </div>
                            <Collapse className="orderDetails" isOpen={this.state.isOpenIds.find((id) => id === order.id) ? true: false}>
                            <div >
                                {order.details.map(detail =>
                                    <div className="info" key={detail.id}>

                                        <div className="wrap">
                                            <div className="col-1 quantity"> {detail.quantity}</div>
                                            <div className="col-11 product"> {detail.product}</div>
                                        </div>
                                        <div className="wrap">
                                            <div className="col-1"></div>
                                            <div className="col-12 detailoption">{detail.option}</div>
                                        </div>
                                    </div>

                                )}
                            </div>
                            </Collapse>

                        </div>

                    )} */}


                </div>





            </div>





        );
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        orders: state.cafe.orderList
    }
}


const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return {
        loadCurrentOrdersThunk: () => dispatch(loadCurrentOrdersThunk()),
        finishOrderThunk: (orderId: number) => dispatch(finishOrderThunk(orderId)),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CafeMain);
