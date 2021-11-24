import * as React from 'react';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import './scss/PaymentForm.scss';
import { GoCreditCard } from 'react-icons/go'



interface IFormProps extends ReactStripeElements.InjectedStripeProps { }

interface IFormState {
    name: string;
    token: string;
}

class Form extends React.Component<IFormProps, IFormState> {

    constructor(props: IFormProps) {
        super(props);
        this.state = {
            name: "",
            token: ""
        };
    }

    handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (this.props.stripe !== undefined ) {
            const bearerToken = localStorage.getItem('token'); 
            try {
                let { token } = await this.props.stripe.createToken({ name: this.state.name });
                alert("Success!!")
                let name = this.state.name;
             //   console.log("token", token, name)
              /*  const res = */ await fetch (`${process.env.REACT_APP_API_SERVER}/stripe/addcard/`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${bearerToken}`
                    },
                    body: JSON.stringify({ name, token })
                })
             //   console.log(token);
                // if (res.status !== 200) {
                //     console.log("ERROR");
                this.setState({ 
                    token: Math.random()+ "" ,
                    name:""
            })
                
                // window.location.reload();
                // }
            } catch (e) {
                throw e;
            }
        }
    }


    render() {
        return (
            <div>
            <div className="container-fluid-icon">
                <GoCreditCard className="credit-card-icon" />
            </div>

            <main className="container-fluid">
            <form className="payment-form"
                onSubmit={this.handleSubmit}
            >
                {/* <p className="form-title">Name</p> */}
                <input
                    type="text"
                    placeholder="Name"
                    className="name"
                    value={this.state.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })}
                />
                {/* <p className="form-title">Card</p> */}
                <CardElement key={this.state.token} className="card" />
                <div className="btn-save">
                <button className="save-btn">Save</button></div>
            </form>




                {/* <form className="addForm form-group mt-3 border-primary rounded shadow-lg p-3"
                    onSubmit={this.handleSubmit}
                >
                    <label>Name</label>
                    <input
                        type="text"
                        className="input-group my-1 p-1 border-dark"
                        value={this.state.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })}
                    />
                    <label>CC Number -- Exp. Date -- CC</label>
                    <CardElement className="p-2 border boder-dark" />
                    <button className="bytn btn-primary border border-dark shadow mt-3 center">Save card</button>
                </form> */}
 







            </main>
            </div>
        );
    }
}



export default injectStripe(Form);