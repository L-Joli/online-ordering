import * as express from 'express';
import { CafeService } from '../services/CafeService';
import * as socketIO from 'socket.io';

export class CafeRouter {

    constructor(private cafeService: CafeService, private io: socketIO.Server) {

    }

    public router() {
        const router = express.Router();

        router.get('/current', this.listCurrentOrders); 
        router.get('/finished', this.listFinishedOrders); 
        router.get('/past', this.listPastOrders); 
        router.put('/current/:orderId', this.finishOrder); 
        router.put('/finished/:orderId', this.deliverOrder); 
  
        return router;
    }
  
    public listCurrentOrders = async (req: express.Request, res: express.Response, next:express.NextFunction) => {
        try {
            res.json(await this.cafeService.listCurrentOrders());
            this.io.sockets.emit('status', "finished");
            next();
        } catch (e) {
            console.error('listCurrentOrders error is found...');
            console.error(e.message);
        }
    }
   
    public listFinishedOrders = async (req: express.Request, res: express.Response) => {
        try {
            res.json(await this.cafeService.listFinishedOrders());
        } catch (e) {
            console.error('listFinishedOrders error is found...');
            console.error(e.message);
        }
    }

    public listPastOrders = async (req: express.Request, res: express.Response) => {
        try {
            res.json(await this.cafeService.listPastOrders());
        } catch (e) {
            console.error('listPastOrders error is found...');
            console.error(e.message);
        }
    }

    public finishOrder = async (req: express.Request, res: express.Response) => {
        try {
            res.json(await this.cafeService.finishOrder((req.params as any).orderId));
        } catch (e) {
            console.error('finishOrder error is found...');
            console.error(e.message);
        }
    }

    public deliverOrder = async (req: express.Request, res: express.Response, next:express.NextFunction) => {
        try {
            res.json(await this.cafeService.deliverOrder((req.params as any).orderId));
            this.io.sockets.emit('delivered', "true");
            next();
        } catch (e) {
            console.error('deliverOrder error is found...');
            console.error(e.message);
        }
    }
 
}

