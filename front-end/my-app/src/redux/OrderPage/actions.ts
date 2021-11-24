import { CustomerOrder } from './state';
export const LOAD_CUSTOMER_ORDERS = 'LOAD_CUSTOMER_ORDERS';
export const LOAD_PAST_ORDERS ='LOAD_PAST_ORDERS';

export interface ILoadCustomerOrdersAction {
    type: typeof LOAD_CUSTOMER_ORDERS;
    customerOrders: CustomerOrder[];
}

export interface ILoadPastOrdersAction {
    type: typeof LOAD_PAST_ORDERS;
    pastOrders: CustomerOrder[];
}



export function loadCustomerOrders(customerOrders: CustomerOrder[]): ILoadCustomerOrdersAction {
    return {
        type: LOAD_CUSTOMER_ORDERS, 
        customerOrders
    }
}

export function loadPastOrders(pastOrders: CustomerOrder[]): ILoadPastOrdersAction {
    return {
        type: LOAD_PAST_ORDERS, 
        pastOrders
    }
}

export type IOrderPageActions = ILoadCustomerOrdersAction|ILoadPastOrdersAction ;