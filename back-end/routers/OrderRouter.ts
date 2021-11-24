import * as express from 'express';
// import { OrderService } from '../services/OrderService';
import * as stripeLoader from 'stripe';
import * as Knex from 'knex';
import * as socketIO from 'socket.io';

export class OrderRouter {
    private stripe = new stripeLoader('sk_test_4UoA2so88KhI2ANo44BI62gG002voj9FCS');
    private orderTable: string;
    constructor(private knex: Knex, private io: socketIO.Server) {
        this.orderTable = "order"
    }

    public router() {
        const router = express.Router();
        router.post('/', this.createOrder);


        return router;
    }

    public createOrder = async (req: express.Request, res: express.Response) => {
        try {
            console.log("create_order", req.body.amount, req.body.cardId,req.body.orderID,req.body.dateString,req.body.pointsForUser)
            const user = req.user as { stripe_id: string };
            
            const status = await this.stripe.charges.create({
                amount: req.body.amount * 100,
                currency: 'hkd',
                customer: user.stripe_id,
                source: req.body.cardId,
                description: 'Order'
            });

            console.log("create_order", status)
            
             const date = new Date(req.body.dateString).toISOString()
             const userID = (req.user as any).id
            if (status && status.id) {
                // Add orderINFO
                    await this.knex.update({
                        stripe_receipt:"success",
                        amount:req.body.amount,
                        taken_time:date
                    }).into(this.orderTable).where('id',req.body.orderID)
                
                // Get points from user
                    const userPoint = await this.knex.select('point')
                    .from('users')
                    .where('id',userID).returning(['point']);
                   // console.log(userPoint)

                // update points to user
                  const updatedPoint:number = (userPoint[0].point) + req.body.pointsForUser
                  await this.knex.update({
                      point:updatedPoint
                  }).into('users')
                  .where('id',userID);

                // send info to Cafe
                    this.io.sockets.emit('users paid', "hi")

                res.json({ message: "ok" })
            } else {
                res.status(400).json({ message: "failed" })
            }
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: "failed" })
        }
    }

     


}

