import React from 'react';
import './scss/App.scss';
import './scss/More.scss';
import './scss/card-list.scss';
import { Link } from 'react-router-dom';
import { MdPlaylistAdd } from 'react-icons/md';
import { FiDelete } from 'react-icons/fi';
import { connect } from 'react-redux';
import { IRootState, ThunkDispatch } from './redux/store';
import { fetchCardList, deleteCardThunk } from './redux/PaymentList/thunk';
import { Card } from './redux/PaymentList/state';
import { FaCcMastercard, FaCcVisa, FaCcAmex } from 'react-icons/fa';
// import { deleteCard } from './redux/PaymentList/action';



interface IPaymentListProps {
    cards: Card[]
    fetchCardList: () => void
    deleteCardThunk: (cardId: string) => void;

}



class PaymentList extends React.Component<IPaymentListProps>{
    constructor(props:IPaymentListProps ) {
        super(props);
        this.state = {
          cardList: [],                                                                  
    }
  }

    componentDidMount() {
  
            this.props.fetchCardList();
            
        
    }

    private deleteCard = (cardId: string) => {
        this.props.deleteCardThunk(cardId);
    }


    public render() {

        const { cards } = this.props;
        return (
            <div>
                <div className="top">
                    <div className="paying-with">Paying with</div>
                </div>
                <div className="card">
                    <div className="paymentList-btn">
                        <Link className="addCard" to="/addpayment" >{<MdPlaylistAdd />} Add credit card</Link>
                    </div>

                    <div className="card-list">


                        {cards && cards.map(card => (<div key={card.id}>
                            <div className="a-card">
                                <div className="card-brand-icon" >
                                    {(card.brand) === "MasterCard" ? <FaCcMastercard className="masterCard" /> : ""}
                                    {(card.brand) === "Visa" ? <FaCcVisa className="visa" /> : ""}
                                    {(card.brand) === "American Express" ? <FaCcAmex className="amex" /> : ""}

                                </div>

                                <div className="card-number">
                                    <p>**** **** **** {card.last4}</p>
                                    <p className="card-brand-name">{card.brand}</p>
                                </div>

                                <div className="font delete" onClick={() => this.deleteCard(card.id)}><FiDelete /></div>
                            </div>
                        </div>))}
                    </div>

                </div>




            </div>
        )




    }
}


const mapStateToProps = (state: IRootState) => {
    return {
        cards: state.card.cards,
    }
}


const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return {

        fetchCardList: () => dispatch(fetchCardList()),
        deleteCardThunk: (cardId: string) => dispatch(deleteCardThunk(cardId))
        //   cardListThunk: () => dispatch(exchangeCardListThunk())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentList);
