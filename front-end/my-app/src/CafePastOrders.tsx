import React from 'react';
import './scss/Cafe.scss';
import './scss/CafeMain.scss';
import { connect } from 'react-redux';
import { ThunkDispatch, IRootState } from './redux/store';
import { loadPastOrdersThunk } from './redux/Cafe/thunk';
import { PastOrder } from './redux/Cafe/state';
import CafeSideBar from './CafeSideBar';
import CafeContent from './CafeContent';

interface ICafePastProps {
    orders: PastOrder[];
    loadPastOrdersThunk: () => void;
};

interface IState {
    isOpenIds: number[];
};

class CafePast extends React.Component<ICafePastProps, IState>{

    constructor(props: ICafePastProps) {
        super(props);
        this.state = { isOpenIds: [] };
    }


    // const [isOpen, setIsOpen] = useState(false);

    

    componentDidMount() {
        this.props.loadPastOrdersThunk();
    }

    toggle = (orderId: number) => {

        const { isOpenIds } = this.state;
        // const isOpenIds = this.state.isOpenIds;

        if (isOpenIds.includes(orderId) ) {
            this.setState({
                isOpenIds: this.state.isOpenIds.filter( (id) => id !== orderId)
            });
        } else {
            this.setState({ isOpenIds: this.state.isOpenIds.concat([orderId]) })
        }
        // setIsOpen(!isOpen);
    }
    

    public render() {

        return (

            <div className="cafeMain">


                <CafeSideBar />
                <div className="cafeContent">

                <CafeContent title="Past Orders" orders={this.props.orders} />

                    {/* <p>
                        Past Orders
                    </p>


                    {this.props.orders.map(order =>
                        <div className="cafeOrders" key={order.id}>
                            <div className="order row" >

                                <div className="col-1 orderId">
                                    {order.id}
                                </div>

                                <div className="col-10 details" onClick={()=>this.toggle(order.id)} >

                                    <div className="name">{order.user}</div>
                                    <div className="time">{new Date(order.taken_time).toLocaleString().slice(0,10)} {new Date(order.taken_time).toLocaleString().slice(12,17)}</div>

                                </div>

                                <div className="col-1 amount">$ {order.amount.slice(0,2)}</div>



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
        orders: state.cafe.pastOrders
    }
}


const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return {
        loadPastOrdersThunk: () => dispatch(loadPastOrdersThunk())


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CafePast);
