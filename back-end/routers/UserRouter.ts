import * as express from 'express';
import * as jwtSimple from 'jwt-simple';
import jwt from '../jwt';
import { checkPassword } from '../hash';
import { UserService } from '../services/UserService';
import { isLoggedIn } from '../guards';
import fetch from 'node-fetch';
// import * as stripeLoader from 'stripe';



export class UserRouter {

    constructor(private userService: UserService) {

    }

    // private stripe = new stripeLoader('sk_test_4UoA2so88KhI2ANo44BI62gG002voj9FCS');


    public router() {
        const router = express.Router();
        router.post('/login', this.login);
        router.post('/register', this.register);
        router.post('/nestcafeLogin', this.cafeLogin);
        router.post('/loginFacebook', this.loginFacebook);
        router.post('/currentUser', isLoggedIn, this.currentUser);

        return router;
    }

    private currentUser = async (req: express.Request, res: express.Response) => {
        res.json(req.user);
    }

    private login = async (req: express.Request, res: express.Response) => {
        try {
            if (!req.body.username || !req.body.password) {
                res.status(401).json({ msg: "Wrong Username/Password" });
                return;
            }
            const { username, password } = req.body;
            const user = (await this.userService.getUserByUsername(username));
            if (!user || !(await checkPassword(password, user.password))) {
                res.status(401).json({ msg: "Wrong Username/Password" });
                return;
            }
            const payload = {
                id: user.id
            };
            const token = jwtSimple.encode(payload, jwt.jwtSecret);
            res.json({
                token: token
            });
        } catch (e) {
            console.log(e)
            res.status(500).json({ msg: e.toString() })
        }
    }



    protected register = async (req: express.Request, res: express.Response) => {

        try {
            const result = await this.userService.addUsers(
            req.body.username, req.body.password)
          console.log(result);
          res.json({ registration: true });
        } catch (e) {
            console.log(e)
            res.status(500).json({ registration: false, result: e.message })
        }
    }

    




    private cafeLogin = async (req: express.Request, res: express.Response) => {
        try {
            if (!req.body.username || !req.body.password) {
                res.status(401).json({ msg: "Wrong Username/Password" });
                return;
            }
            const { username, password } = req.body;
            const user = (await this.userService.getUserByUsername(username));

            if (!user || user.role !== "admin" || !(await checkPassword(password, user.password))) {
                res.status(401).json({ msg: "Wrong Username/Password" });
                return;
            }
            const payload = {
                id: user.id
            };
            const token = jwtSimple.encode(payload, jwt.jwtSecret);
            res.json({
                token: token
            });
        } catch (e) {
            console.log(e)
            res.status(500).json({ msg: e.toString() })
        }
    }

    private loginFacebook = async (req: express.Request, res: express.Response) => {
        try {
            if (!req.body.accessToken) {
                res.status(401).json({ msg: "Wrong Access Token!" });
                return;
            }
            const { accessToken } = req.body;
            const fetchResponse = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`);
            const result = await fetchResponse.json();
            if (result.error) {
                res.status(401).json({ msg: "Wrong Access Token!" });
                return;
            }
            let user = (await this.userService.getUserByFbId(result.id));

            // Create a new user if the user does not exist
            if (!user) {
                user = (await this.userService.createFacebookUser(result.email, result.id))[0];
                //  console.log(user);

                // const customer = (await this.stripe.customers.create({
                //     description: req.body.name
                // }));

                // await this.stripe.sources.create({
                //     type: 'card',
                //     currency: 'hkd',
                //     token: (req.body.token != null) ? req.body.token.id : null,
                // });


                //  await this.userService.createStripeCustomerId(customer.id, userId)

            }
            const payload = {
                id: user.id,
                username: user.username
            };
            const token = jwtSimple.encode(payload, jwt.jwtSecret);
            res.json({
                token: token
            });
        } catch (e) {
            res.status(500).json({ msg: e.toString() })
        }
    }

}