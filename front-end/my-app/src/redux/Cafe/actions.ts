import { Order, FinishedOrder, PastOrder } from './state';
export const LOAD_ORDERS = 'LOAD_ORDERS';
export const LOAD_FINISHED_ORDERS = 'LOAD_FINISHED_ORDERS';
export const LOAD_PAST_ORDERS = 'LOAD_PAST_ORDERS';

export interface ILoadOrdersAction {
    type: typeof LOAD_ORDERS;
    orderList: Order[];
}

export interface IFinishedOrdersAction {
    type: typeof LOAD_FINISHED_ORDERS;
    finishedOrders: FinishedOrder[];
}

export interface IPastOrdersAction {
    type: typeof LOAD_PAST_ORDERS;
    pastOrders: PastOrder[];
}



export type ICafeActions = ILoadOrdersAction | IFinishedOrdersAction | IPastOrdersAction;


export function loadOrders(orderList: Order[]): ILoadOrdersAction {
    return {
        type: LOAD_ORDERS, 
        orderList
    }
}

export function loadFinishedOrders(finishedOrders: FinishedOrder[]): IFinishedOrdersAction {
    return {
        type: LOAD_FINISHED_ORDERS, 
        finishedOrders
    }
}

export function loadPastOrders(pastOrders: PastOrder[]): IPastOrdersAction {
    return {
        type: LOAD_PAST_ORDERS, 
        pastOrders
    }
}