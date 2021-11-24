import React from 'react';
import './scss/App.scss';
import './scss/Bag.scss';
import './scss/card-list.scss';
import { Card } from './redux/PaymentList/state';
import { connect } from 'react-redux';
import { ThunkDispatch } from './redux/store';
import { MdRadioButtonChecked, MdRadioButtonUnchecked, MdKeyboardArrowRight } from 'react-icons/md';
import { FaCcMastercard, FaCcVisa, FaCcAmex } from 'react-icons/fa';
import { Drawer } from 'antd';
import { selectCardByDrawer } from './redux/Order/action';




interface IDrawerProps {
    cards: Card[];
    // fetchCardList: () => void;
    // createOrder: (amount: number, cardId: string) => void;
    // selected: string;
    selectCardByDrawer: (selectCard: string) => void
}

interface IDrawerState {
    selectedCard: string,
    brand: string,
    visible: boolean,
}




class SelectCard extends React.Component<IDrawerProps, IDrawerState> {

    constructor(props: IDrawerProps) {
        super(props);
        this.state = {
            visible: false,
            selectedCard: '',
            brand:''
        };
    }

    // componentDidMount() {
    //     this.props.fetchCardList()
    //     const { cards, fetchCardList } = this.props;

    //     if (!cards || cards.length === 0) {
    //         fetchCardList()
    //     }
    // }


    private select = (cardId: string) => {
        this.setState({
            selectedCard: cardId
        })
      //  console.log("selected: " + cardId)
        this.props.selectCardByDrawer(cardId)
    }


    private showDrawer = (_event: React.MouseEvent) => {
        this.setState({
            visible: true,
        });
    };


    private onClose = () => {
        this.setState({
            visible: false,
        });
    };



    render() {
        const { cards } = this.props;

        return (
            <div>
                <div className="container-fluid select-payment-method"  onClick={this.showDrawer}>

                    <div className="title-payment-method">Payment method</div>
                    <div className="default-card"><MdKeyboardArrowRight className="select-payment-forward-btn" /></div>
                </div>


                <Drawer
                    title="Paying with"
                    placement="bottom"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <div className="card-list">
                        {cards && cards.map(card => (<div key={card.id}>
                            <div className="a-card" onClick={() => this.select(card.id)}>
                                {/* {console.log("HIHIHIHI", card.brand)} */}
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

                </Drawer>
            </div>
        );
    }
}



const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return {
        selectCardByDrawer: (selectCard: string) => dispatch(selectCardByDrawer(selectCard))
    }
}





export default connect(null,mapDispatchToProps)(SelectCard);