import * as express from 'express';
import * as stripeLoader from 'stripe';
import { StripeService } from '../services/StripeService';
import { ICard } from 'stripe';
// import { Card } from 'reactstrap';

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys


export class StripeRouter {
    constructor(public stripeService: StripeService) { }

    private stripe = new stripeLoader('sk_test_4UoA2so88KhI2ANo44BI62gG002voj9FCS');

    public router() {
        const router = express.Router();
        router.post('/addcard/', this.addCard);
        router.delete('/deletecard', this.deleteCard);
        router.get('/getcard', this.getCard);

        return router;
    }

    // private charge = (token: string, amt: number) => {
    //     return this.stripe.charges.create({
    //         amount: amt * 100,
    //         currency: 'hkd',
    //         source: token,
    //         description: 'Example charge'
    //     });
    // }



    // // POST
    // protected postCharge = async (req: express.Request, res: express.Response) => {
    //     try {
    //         let data = await this.charge(req.body.token.id, req.body.amount);
    //         console.log(data);
    //         res.send("Charged!")
    //     } catch (e) {
    //         console.log(e);
    //         res.status(500);
    //     }
    // }


 
    // add card
    protected addCard = async (req: express.Request, res: express.Response) => {

        try {

            // const customer = await this.stripe.customers.create({
            //     description: `Customer for ${req.body.name}`,
            //     name: req.body.name,

            //     // source: source
            // })

            // const source = await this.stripe.sources.create({
            //     type: 'card',
            //     currency: 'hkd',
            //     token: (req.body.token != null) ? req.body.token.id : null,
            // });

            const user = req.user as { stripe_id: string };
           // console.log("test", user);

            const cardToken = await this.stripe.tokens.create({
                card: {
                    object: 'card',
                    number: '4242424242424242',
                    exp_month: 4,
                    exp_year: 2024,
                    cvc: '242',
                },
            });

           // console.log("card_test", cardToken.card, user.stripe_id, req.body.token)


            const addCard = await this.stripe.customers.createSource(user.stripe_id, {
                source: req.body.token.id,
            });


            // const customer = await this.stripe.customers.retrieve(user.stripe_id);
            // {
            //     const res = await this.stripe.customers.createSource(user.stripe_id, {
            //         source: {
            //             object: 'card',
            //             number: '4242424242424242',
            //             exp_month: 11,
            //             exp_year: 2020,
            //             cvc: '424',
            //         }
            //     });
            //     console.log(res);
            // }

            res.json({ result: true });

        } catch (e) {
            console.log(e);
            console.log("update customer Failed")
            res.status(500).end();
        };
    }



    protected deleteCard = async (req: express.Request, res: express.Response) => {
        try {
            const user = req.user as { stripe_id: string };
          //  console.log(user);

          //  console.log(req.body.id)
            const deleteCard = await this.stripe.customers.deleteSource(user.stripe_id, req.body.id);
            res.json({result:true});
        } catch(e) {
            console.log("delete card Failed", e)
            res.status(500).end();
        }

    }


    protected getCard = async (req: express.Request, res: express.Response) => {
        try {
            const user = req.user as { stripe_id: string };
          //  console.log(user);

            
            const cards = await this.stripe.customers.listSources(user.stripe_id, {
                object: "card"
            });


            const cardsInfo = cards.data.map((card: ICard) => ({
                id: card.id,
                brand: card.brand,
                last4: card.last4
            }))

            res.json(cardsInfo)

        } catch(e) {
            console.log("delete card Failed", e)
            res.status(500).end();
        }

    }

    


    //charge customer
    // protected chargeCustomer = async (req: express.Request, res: express.Response) => {
    //     const charge = await this.stripe.charges.create({
    //         amount: Math.round(payee.amount * 100),
    //         currency: "hkd",
    //         customer: customer.id,
    //         description: "搞掂食碗麵"
    //     });

    // }


    // private charge = (token: string, amt: number) => {
    //     return this.stripe.charges.create({
    //         amount: amt * 100,
    //         currency: 'hkd',
    //         source: token,
    //         description: 'Example charge'
    //     });
    // }
}
