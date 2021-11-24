import * as Knex from 'knex';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import passport = require('passport');
import { StripeService } from './services/StripeService';
import { StripeRouter } from './routers/StripeRouter';

import { initializePassport } from './passport';
import { UserService } from './services/UserService';
import { UserRouter } from './routers/UserRouter';
import { MenuService } from './services/MenuService';
import { MenuRouter } from './routers/MenuRouter';
import { OptionService } from './services/OptionService';
import { OptionRouter } from './routers/OptionRouter';

import { RewardsService } from './services/RewardsService';
import { RewardsRouter } from './routers/RewardsRouter';
import { isLoggedIn /*, adminLoggedIn */ } from './guards';
import { OrderRouter } from './routers/OrderRouter';
import { CafeService } from './services/CafeService';
import { CafeRouter } from './routers/CafeRouter';
import { OrderPageService } from './services/OrderPageService';
import { OrderPageRouter } from './routers/OrderPageRouter';
import { BagService } from './services/BagService';
import { BagRouter } from './routers/BagRouter';
import * as http from 'http';
import * as socketIO from 'socket.io';



const app = express();
const knexFile = require('./knexfile');
const knex = Knex(knexFile[process.env.NODE_ENV || 'development']);
const server = new http.Server(app);
const io = socketIO(server);

io.on('connection', socket => {
    console.log('User connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
    // socket.on('users paid', (msg) => {
    //     // once we get a 'users paid' event from one of our clients, we will send it to the rest of the clients
    //     // we make use of the socket.emit method again with the argument given to use from the callback function above
    //     console.log('Color Changed to: ', msg)
    //     io.sockets.emit('users paid', msg)
    //   })
})



app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize());

app.use((req, res, next)=>{ res.locals['socketio'] = io; next(); });


// const userService = new UserService(knex);
// app.use('/users', new UserRouter(userService).router());
// initializePassport(userService);
const userService = new UserService(knex);
app.use('/users', new UserRouter(userService).router());
initializePassport(userService);

const menuService = new MenuService(knex);
const menuRouter = new MenuRouter(menuService);
app.use('/menu', menuRouter.router());

const optionService = new OptionService(knex);
app.use('/options', new OptionRouter(optionService).router());
// initializePassport(optionService);
//stripe
const stripeService = new StripeService(knex);
app.use('/stripe', isLoggedIn, new StripeRouter(stripeService).router());

const rewardsService = new RewardsService();
app.use('/rewards', isLoggedIn, new RewardsRouter(rewardsService).router());
app.use('/order', isLoggedIn, new OrderRouter(knex, io).router());

const cafeService = new CafeService();
app.use('/cafe', isLoggedIn, /*adminLoggedIn,*/ new CafeRouter(cafeService,io).router());

const orderPageService = new OrderPageService();
app.use('/ordersPage', isLoggedIn, new OrderPageRouter(orderPageService).router());

const bagService = new BagService(orderPageService);
app.use('/bag', isLoggedIn, new BagRouter(bagService).router());


const PORT = 8080
server.listen(PORT, () => {
    console.log(`Sever has started http://localhost:${PORT}`)
})
