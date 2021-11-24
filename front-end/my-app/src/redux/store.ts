import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { RouterState, connectRouter, routerMiddleware, CallHistoryMethodAction } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk, { ThunkDispatch } from 'redux-thunk';
import logger from 'redux-logger';
import { IAuthState } from './auth/state';
import { AuthActions } from './auth/actions';
import { authReducer } from './auth/reducer';
import { IDrinkState } from './DrinkList/state';
import { IDrinkActions } from './DrinkList/actions';
import { drinkReducer } from './DrinkList/reducer';
import { IRewardsActions } from './rewards/actions';
import { IRewardsState } from './rewards/state';
import { rewardsReducer } from './rewards/reducer';
import { IAlertState } from './alertStyle/state';
import { IAlertActions } from './alertStyle/actions';
import { alertReducer } from './alertStyle/reducer';
import { ICardState } from './PaymentList/state';
import { cardReducer } from './PaymentList/reducer';
import { ICardActions } from './PaymentList/action';
import { IOrderActions } from './Order/action';
import { IOrderState } from './Order/state';
import { orderReducer } from './Order/reducer';
import { ICafeState } from './Cafe/state';
import { ICafeActions } from './Cafe/actions';
import { cafeReducer } from './Cafe/reducer';
import { IOrderPageActions } from './OrderPage/actions';
import { orderPageReducer } from './OrderPage/reducer';
import { IOrderPageState } from './OrderPage/state';
import { IItemState } from './DrinkItem/state';
import { IItemActions } from './DrinkItem/actions';
import { itemReducer } from './DrinkItem/reducer';
import { IBagState } from './bag/state';
import { IBagActions } from './bag/actions';
import { bagReducer } from './bag/reducer';

export const history = createBrowserHistory();

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    }
}


export interface IRootState {

    drinkState: IDrinkState;
    auth: IAuthState;
    rewards: IRewardsState;
    alert: IAlertState;
    card: ICardState;
    order: IOrderState;
    cafe: ICafeState;
    orderPage: IOrderPageState;
    router: RouterState;
    itemState:IItemState;
    bag:IBagState;
}


export type IRootAction = AuthActions 
                        | IRewardsActions 
                        | IAlertActions 
                        | IDrinkActions 
                        | ICardActions 
                        | IOrderActions 
                        | ICafeActions
                        | IOrderPageActions
                        | IItemActions
                        | IBagActions
                        | CallHistoryMethodAction;


const rootReducers = combineReducers({
    drinkState: drinkReducer,
    auth: authReducer,
    rewards: rewardsReducer,
    alert: alertReducer,
    card: cardReducer,
    order: orderReducer,
    cafe: cafeReducer,
    orderPage: orderPageReducer,
    itemState: itemReducer,
    bag: bagReducer,
    router: connectRouter(history)
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type ThunkDispatch = ThunkDispatch<IRootState, null, IRootAction>

export const store = createStore<IRootState, IRootAction, {}, {}>(
    rootReducers,
    composeEnhancers(
        applyMiddleware(logger),
        applyMiddleware(thunk),
        applyMiddleware(routerMiddleware(history))
    )
);
