import * as express from 'express';
import { MenuService } from '../services/MenuService';

export class MenuRouter {

    constructor(private menuService: MenuService) {

    }


    public router() {
        const router = express.Router();

        router.get('/coffee', this.getCoffee); //ok
        router.get('/special', this.getSpecialDrink); //ok
        router.get('/chocolate', this.getBelgianChocolate); //ok
        router.get('/tea', this.getTea); //ok
        router.get('/savoury', this.getSavoury); //ok
        router.get('/sweet', this.getSweet); //ok
        
        return router;
    }

    public getCoffee = async (req: express.Request, res: express.Response) => {
        try {
            const drinks = await this.menuService.getCoffee()
            res.json({data:drinks})
        } catch (e) {
            res.status(500).json({msg:e});
        }
    }
    
    public getSpecialDrink = async (req: express.Request, res: express.Response) => {
        try {
            const drinks = await this.menuService.getSpecialDrink()
            res.json({data:drinks})
        } catch (e) {
            res.status(500).json({msg:e});
        }
    }

    public getBelgianChocolate = async (req: express.Request, res: express.Response) => {
        try {
            const drinks = await this.menuService.getBelgianChocolate()
            res.json({data:drinks})
        } catch (e) {
            res.status(500).json({msg:e});
        }
    }
    
    public getTea = async (req: express.Request, res: express.Response) => {
        try {
            const drinks = await this.menuService.getTea()
            res.json({data:drinks})
        } catch (e) {
            res.status(500).json({msg:e});
        }
    }

    public getSavoury = async (req: express.Request, res: express.Response) => {
        try {
            const drinks = await this.menuService.getSavoury()
            res.json({data:drinks})
        } catch (e) {
            res.status(500).json({msg:e});
        }
    }

    public getSweet = async (req: express.Request, res: express.Response) => {
        try {
            const drinks = await this.menuService.getSweet()
            res.json({data:drinks})
        } catch (e) {
            res.status(500).json({msg:e});
        }
    }





    
    
}