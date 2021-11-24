import * as express from 'express';
import { RewardsService, HttpRequestError } from '../services/RewardsService';

export class RewardsRouter {

    constructor(private rewardsService: RewardsService) {

    }

    public router() {
        const router = express.Router();

        router.get('/', this.listDonationOrganization); 
        router.get('/points', this.listUserInfo); 
        router.post('/:donationId', this.exchangeRewardsToDonation); 
  

        return router;
    }

    public listDonationOrganization = async (req: express.Request, res: express.Response) => {
        try {
            res.json(await this.rewardsService.listDonationOrganization());
        } catch (e) {
            console.error('listDonationOrganization error is found...');
            console.error(e.message);
        }
    }

    public listUserInfo = async (req: express.Request, res: express.Response) => {
        try {
            res.json(await this.rewardsService.listUserInfo((req.user as any).id));
        } catch (e) {
            console.error('listUserInfo error is found...');
            console.error(e.message);
        }
    }

    public exchangeRewardsToDonation = async (req: express.Request, res: express.Response) => {
        try {
           // console.log(req.body)
            await this.rewardsService.exchangeRewardsToDonation((req.user as any).id, (req.params as any).donationId, req.body.progress);
            res.json({result : "ok"});
        } catch (e) {
            console.error('exchangeRewardsToDonation error is found...');
            console.error(e.message);
            if (e instanceof HttpRequestError){
                res.json({status:"reqError", message:e.message});
            }else{
                res.json({status:false, result:"not ok"});
            }
            
        }
    }
 
}

