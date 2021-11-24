import * as express from 'express';
import { Request, Response } from 'express';
import { OptionService } from '../services/OptionService';
import { isLoggedIn } from '../guards';

export class OptionRouter {

    constructor(private optionService: OptionService) {

    }


    public router() {
        const router = express.Router();

        router.get('/option_category/:id', this.getCategory); //ok
        router.get('/product/:id', this.getProduct); //ok
        router.post('/choice',isLoggedIn, this.postChoice); //ok
        // router.get('/price/:id/:option', this.getPrice); //ok

        return router;
    }

    private getCategory = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
       // console.log(req.params.id)
        if (isNaN(id)) {
            res.status(400).json({ msg: "Id is not integer." });
            return;
        }
        try {
            const category = await this.optionService.getCategory(id);
            res.json({ data: category });
        } catch (e) {
            res.status(500).json({ msg: e });
        }
    }

    public getProduct = async (req: express.Request, res: express.Response) => {
        const id = parseInt(req.params.id);
       // console.log(req.params.id)
        if (isNaN(id)) {
            res.status(400).json({ msg: "Id is not integer." });
            return;
        }
        try {
            const product = await this.optionService.getProduct(id)
            res.json({ data: product })
        } catch (e) {
            res.status(500).json({ msg: e });
        }
    }

   
    
    private postChoice = async (req:Request,res:Response)=>{
        try{
            await this.optionService.addChoice((req.user as any).id,({
                id:req.body.id,
                qty:req.body.qty,
                selectedOption:req.body.selectedOption 
            }));
            res.json({result : "ok"});
        }catch(e){
            console.log(e)
            res.status(500).json({msg:e});
        }
        
    }
   
}