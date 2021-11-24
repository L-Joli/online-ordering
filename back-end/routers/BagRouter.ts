import * as express from 'express';
import { BagService } from '../services/BagService';

export class BagRouter {

    constructor(private bagService: BagService) {

    }

    public router() {
        const router = express.Router();

        router.get('/', this.listBagOrders); 
        router.delete('/:id', this.deleteItem); 
        router.put('/:id', this.editNumberOfItems); 
  
        return router;
    }

    public listBagOrders = async (req: express.Request, res: express.Response) => {
        try {
            res.json(await this.bagService.listBagOrders((req.user as any).id));
           // console.log(req.user);
        } catch (e) {
            res.json({status:false});
            console.error('listBagOrders error is found...');
            console.error(e.message);
        }
    }

    public deleteItem = async (req: express.Request, res: express.Response) => {
        try {
            res.json(await this.bagService.deleteItem((req.params as any).id));
        } catch (e) {
            res.json({status:false});
            console.error('deleteItem error is found...');
            console.error(e.message);
        }
    }
 

    public editNumberOfItems = async (req: express.Request, res: express.Response) => {
        try {
            res.json(await this.bagService.editNumberOfItems((req.params as any).id, req.body.num));
        } catch (e) {
            res.json({status:false});
            console.error('editNumberOfItems error is found...');
            console.error(e.message);
        }
    }
  
}

