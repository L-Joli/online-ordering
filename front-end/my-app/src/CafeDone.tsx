import React from 'react';
import './scss/Cafe.scss';
import './scss/CafeMain.scss';
import { connect } from 'react-redux';
import { ThunkDispatch, IRootState } from './redux/store';
import { loadFinishedOrdersThunk, deliverOrderThunk } from './redux/Cafe/thunk';
import { FinishedOrder } from './redux/Cafe/state';
import CafeSideBar from './CafeSideBar';
import CafeContent from './CafeContent';

interface ICafeDoneProps {
    orders: FinishedOrder[];
    loadFinishedOrdersThunk: () => void;
    deliverOrderThunk: (orderId: number) => void;
};

interface IState {
    isOpenIds: number[];
};

class CafeDone extends React.Component<ICafeDoneProps, IState>{

    constructor(props: ICafeDoneProps) {
        super(props);
        this.state = { isOpenIds: [] };
    }


    // const [isOpen, setIsOpen] = useState(false);

    

    componentDidMount() {
        this.props.loadFinishedOrdersThunk();
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
    
    private checkedOrder = (orderId: number) => {
        this.props.deliverOrderThunk(orderId);
    }



    public render() {

        return (

            <div className="cafeMain">


                <CafeSideBar />
                <div className="cafeContent">

                <CafeContent title="Finished Orders" orders={this.props.orders} checkedOrder={this.checkedOrder} />

              

                </div>





            </div>





        );
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        orders: state.cafe.finishedOrders
    }
}


const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return {
        loadFinishedOrdersThunk: () => dispatch(loadFinishedOrdersThunk()),
        deliverOrderThunk: (orderId: number) => dispatch(deliverOrderThunk(orderId)),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CafeDone);
