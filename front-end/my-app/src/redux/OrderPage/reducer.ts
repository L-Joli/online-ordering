import { IOrderPageState } from "./state";
import { IOrderPageActions, LOAD_CUSTOMER_ORDERS, LOAD_PAST_ORDERS } from "./actions";

const initialState = {
    customerOrders: [],
    pastOrders:[]
}

export function orderPageReducer(oldState:IOrderPageState = initialState, action:IOrderPageActions) {

    switch(action.type){
        case LOAD_CUSTOMER_ORDERS:
            return {
                ...oldState,
                customerOrders: action.customerOrders,
            }
        case LOAD_PAST_ORDERS:
                return {
                    ...oldState,
                    pastOrders: action.pastOrders,
                }
        default:
            return oldState;
    }
}
