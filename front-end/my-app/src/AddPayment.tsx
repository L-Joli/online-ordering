import React from 'react';
import './scss/App.scss';
import './scss/More.scss';
import { StripeProvider, Elements } from 'react-stripe-elements';
import Form from './Form';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { ThunkDispatch } from './redux/store';



export default class AddPayment extends React.Component<IAddPaymentProps, IAddPaymentState>{


  public render() {
    return (

      <div className="more">

        <>
          <StripeProvider apiKey="pk_test_PgBZ8ePElLUm2lFMrkfMs5kv00q7JlwH7m">
            <Elements>
              < Form />
            </Elements>
          </StripeProvider>
        </>

      </div>
    );

  }

}

interface IAddPaymentProps { }

interface IAddPaymentState { }