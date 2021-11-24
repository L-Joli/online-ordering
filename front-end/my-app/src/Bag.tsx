import React from 'react';
import './scss/App.scss';
import './scss/Bag.scss';
import './scss/card-list.scss';
import './images/logo.png';
import CheckOut from './CheckOut';
import { Card } from './redux/PaymentList/state';
import { connect } from 'react-redux';
import { fetchCardList } from './redux/PaymentList/thunk';
import { IRootState, ThunkDispatch } from './redux/store';
import { createOrderRemote } from './redux/Order/thunk';
import { FaTimes } from 'react-icons/fa';
import moment from 'moment';
import { push } from 'connected-react-router';

//ANTD
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Badge } from 'reactstrap';
import { DatePicker } from 'antd';
// import { Drawer, Button } from 'antd';
import 'antd/dist/antd.css';
//ANTD

import { loadBagThunk, editQuantityThunk, deleteItemThunk } from './redux/bag/thunk';
import { CustomerOrder } from './redux/OrderPage/state';
import SelectCard from './SelectCard';
import { selectCardByDrawer } from './redux/Order/action';
// import { bool } from 'prop-types';
// import { loadCurrentOrdersThunk } from './redux/Cafe/thunk';
import { generalAlert } from './redux/alertStyle/actions';
// import AlertStyle from './AlertStyle';
// import { DateTimeField } from 'react-bootstrap-datetimepicker';
// import socketIOClient from 'socket.io-client';

interface IPaymentMethodProps {
    cards: Card[];
    fetchCardList: () => void;
    createOrder: (amount: number, cardId: string, orderID: number, dateString: string,pointsForUser:number) => void;
    selected: string;
    bags: CustomerOrder[];
    loadBagItems: () => void;
    editquantity: (itemId: number, num: number) => void;
    deleteItem: (itemId: number) => void;
    selectCardByDrawer: (selectCard: string) => void
    redirect:() => void;

}

interface IState {
    selectedCard: string;
    brand: string;
    now: boolean;
    visible: boolean;
    modal: boolean;
    dateString: string;
    dateConfirm: boolean;


}




class Bag extends React.Component<IPaymentMethodProps, IState>{
    state = {
        selectedCard: '',
        brand: '',
        now: true,
        visible: false,
        cardId: '',
        modal: false,
        dateString: '',
        dateConfirm: false,

    }


    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

    }

    componentDidMount() {
        this.props.fetchCardList();
        this.props.loadBagItems();
        const { cards, fetchCardList } = this.props;

        if (!cards || cards.length === 0) {
            fetchCardList()
        }
        // if (this.props.bags){
        //   this.setState({ bags: (this.state.bags).concat(this.props.bags   // console.log(this.state.bags)
    }



    private disabledDate = (current: moment.Moment | undefined): boolean => {
        // Can not select days before today and today
        if (current) {
            return current < moment().subtract(1, 'days').endOf('days') || current > moment().add(6, 'days').endOf('days');
        }
        return false;
    }
    
    private disabledPast = (event:any): boolean|undefined => {
        // Can not select days before today and today
        if (new Date(this.state.dateString) >= new Date()) {
            return true
        }else{
           this.setState({
            dateString:''
           })
           alert("please select the valid time")
        }
        
    }






    private deleteItem = (itemId: number) => {
        this.props.deleteItem(itemId);
    }

    private calculateAmount = () => {

        let total = 0;

        if (this.props.bags && this.props.bags.length > 0) {
            for (let detail of this.props.bags[0].details) {
                let subtotal = 0;
                subtotal = subtotal + parseInt(detail.productPrice);
                for (let option of detail.options) {
                    subtotal = subtotal + parseInt(option.extraCharges);
                }
                subtotal = subtotal * detail.quantity;
                total = total + subtotal;
            }
            return total;
        }else{
            return 0;
        }
    }

    private calculatePoint = (total: number) => {

        let pointsForUser = Math.floor(total / 20) * 10;
        return pointsForUser
    }

    private onPayClick = (selectedCard: string) => {
        // const { selectedCard } = this.state;
        const orderID = (this.props.bags.length > 0 ? this.props.bags[0].id : undefined)
        console.log(orderID)
        if (orderID === undefined) {
            return;
        } else if (this.state.dateString === '') {
            alert('Please select time for picking up !!')
        }
        else if (selectedCard && selectedCard.trim() === '') {
            alert("Sorry, invalid credit card !!")
        } else if (selectedCard) {
          //  console.log("payClick")
            let amount = this.calculateAmount();
            let pointsForUser = this.calculatePoint(amount)
          //  console.log(pointsForUser)
            let dateString = this.state.dateString
            if (amount !== undefined) {
                this.props.createOrder(amount, selectedCard, orderID, dateString,pointsForUser);
            }
            this.setState({
                dateString: ''
            })
            alert("Thank you for your order!");
            this.props.redirect();
        } else (alert('Please choose a credit card'))
    

    }

    private pickUpNow = () => {
        if (this.props.bags.length > 0) {
            this.setState({ now: true })
            this.setState({
                dateString: moment(new Date()).format("YYYY-MM-DD HH:mm"),
                dateConfirm: true
            })
          //  console.log(this.props.bags)
        }
        return
    }

    private pickUpLater = () => {
        if (this.props.bags.length > 0) {
            this.setState({ now: false })
            this.setState({
                modal: !this.state.modal
            });
        } return;

    }

    private confirm = () => {
            this.setState({
                modal: !this.state.modal,
                dateConfirm: true
            });
    }

    private toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
      
    }




    private onChange = (date: moment.Moment | null, dateString: string) => {
     //   console.log('Selected Time: ', date);
     //   console.log('Formatted Selected Time: ', dateString);
        this.setState(
            {
                dateString: dateString
            }
        )
    }


    render() {

        // const { cards } = this.props;

        return (

            <div className="bag">
                {/* <DateTimeField /> */}
                <div className="container-fluid ScheduleTime">
                    <div className={"pick-up-now " + (this.state.now ? " picked" : "")} onClick={() => this.pickUpNow()}>
                        PICK UP NOW
                </div>

                    <div className={"schedule " + (this.state.now ? "" : " picked")} onClick={() => this.pickUpLater()}>PICK UP LATER </div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}   >
                        <form onSubmit={this.handleSubmit}>
                            <ModalHeader toggle={this.toggle}>Choose your time </ModalHeader>
                            <ModalBody>

                                <div>
                                    <DatePicker
                                        format="YYYY-MM-DD HH:mm "
                                        // disabledTime={this.disabledDate}
                                        showToday={false}
                                        onChange={this.onChange}
                                        showTime={{
                                            defaultValue: moment('08:00', 'HH:mm '),
                                            format: "HH:mm ",
                                            disabledHours: () => Array(24).fill(0)
                                                .map((_, idx) => idx)
                                                .filter(x => (x < 8 || x > 17)),
                                            minuteStep: 5
                                        }}
                                        onOk={this.disabledPast}
                                        placeholder="Select your time"
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.confirm}>confirm</Button>
                            </ModalFooter>
                        </form>
                    </Modal>


                </div>

               
                    
                        <div >
                            {/* {console.log(this.props.bags)} */}
                            {this.state.dateString !== '' && this.state.dateConfirm ? <div className="selected time">Your order will be ready at about<span>:</span> {this.state.dateString}</div> : ''}
                            {this.props.bags.map(bag =>
                                bag.details.map(detail => {
                                    let subTotal = 0;
                                    return (<div className="bagItems row" key={detail.id}>
                                        <div className="col-6 productList">
                                            <div className="productName">
                                            {/* <picture><img src={require('./images/logo.png')} width="100" height="100"/></picture> */}
                                                {detail.product}
                                            </div>
                                            {detail.options.map(option => {
                                                subTotal += parseInt(option.extraCharges);
                                                return (<div className="optionDetails" key={option.id}>
                                                    <div>
                                                        {option.option}
                                                    </div>
                                                    <div className="charges">
                                                        {option.extraCharges === "0.00" ? "" : "+HKD " + option.extraCharges}
                                                    </div>

                                                </div>)
                                            }
                                            )}
                                        </div>

                                        <div className="col-3 style">
                                           <Badge>{detail.quantity}</Badge>
                                        </div>

                                        <div className="col-3 style">
                                            HKD {(parseInt(detail.productPrice) + subTotal) * detail.quantity}
                                            <FaTimes className="fatimes" onClick={() => this.deleteItem(detail.id)} />
                                        </div>
                                    </div>)
                                }
                                )
                            )}

                            {/* total = {this.calculateAmount()} */}



                            {/* <div className="card">
                                <div className="card-list">
                                    {cards && cards.map(card => (<div key={card.id}>
                                        <div className="a-card" onClick={() => this.select(card.id)}>
                                            {console.log("HIHIHIHI", card.brand)}
                                            <div className="card-brand-icon" >
                                                {(card.brand) === "MasterCard" ? <FaCcMastercard className="masterCard" /> : ""}
                                                {(card.brand) === "Visa" ? <FaCcVisa className="visa" /> : ""}
                                                {(card.brand) === "American Express" ? <FaCcAmex className="amex" /> : ""}

                                            </div>
                                            <div className="card-number">
                                                <p>**** **** **** {card.last4}</p>
                                                <p className="card-brand-name">{card.brand}</p>
                                            </div>
                                            <div className="select-btn" >
                                                {this.state.selectedCard === card.id ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                                            </div>
                                        </div>
                                    </div>))}
                                </div>

                            </div> */}



                        </div>
                  
                

                <SelectCard cards={this.props.cards} />

                <CheckOut total={this.calculateAmount()} pay={this.onPayClick} />
            </div>
        );
    };
}



const mapStateToProps = (state: IRootState) => {
    return {
        cards: state.card.cards,
        bags: state.bag.bags,

    }
}


const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return {
        fetchCardList: () => dispatch(fetchCardList()),
        createOrder: (amount: number, cardId: string, orderID: number, dateString: string,pointsForUser:number) => dispatch(createOrderRemote(amount, cardId, orderID, dateString,pointsForUser)),
        loadBagItems: () => dispatch(loadBagThunk()),
        editquantity: (itemId: number, num: number) => dispatch(editQuantityThunk(itemId, num)),
        deleteItem: (itemId: number) => dispatch(deleteItemThunk(itemId)),
        selectCardByDrawer: (selectCard: string) => dispatch(selectCardByDrawer(selectCard)),
        Alert: (message: string) => dispatch(generalAlert(message)),
        redirect:() => dispatch(push('/orders'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bag);

