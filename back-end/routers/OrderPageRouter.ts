import * as express from 'express';
import { OrderPageService } from '../services/OrderPageService';


export class OrderPageRouter {

    constructor(private orderPageService: OrderPageService) {

    }

    public router() {
        const router = express.Router();

        router.get('/current', this.listCurrentOrders); 
        router.get('/previous', this.listPreviousOrders); 
        router.post('/reOrder/:orderId', this.reOrder); 
   
  
        return router;
    }

    public listCurrentOrders = async (req: express.Request, res: express.Response) => {
        try {
           
            res.json(await this.orderPageService.listCurrentOrders((req.user as any).id));
        } catch (e) {
            res.json({status:false});
            console.error('listCurrentOrders error is found...');
            console.error(e.message);
          //  console.log((req.user as any).id);
        }
    }

    public listPreviousOrders = async (req: express.Request, res: express.Response) => {
        try {
            res.json(await this.orderPageService.listPreviousOrders((req.user as any).id));
        } catch (e) {
            res.json({status:false});
            console.error('listPreviousOrders error is found...');
            console.error(e.message);
        }
    }

    public reOrder = async (req: express.Request, res: express.Response) => {
        try {
          //  console.log((req.user as any).id)
            res.json(await this.orderPageService.reOrder((req.user as any).id, (req.params as any).orderId));
        } catch (e) {
            res.json({status:false});
            console.error('reOrder error is found...');
            console.error(e.message);
        }
    }
  
}

