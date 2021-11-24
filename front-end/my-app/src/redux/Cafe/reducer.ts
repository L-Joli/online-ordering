import { ICafeActions, LOAD_ORDERS, LOAD_FINISHED_ORDERS, LOAD_PAST_ORDERS } from "./actions";
import { ICafeState } from "./state";

const initialState: ICafeState = {
    orderList: [],
    finishedOrders: [],
    pastOrders: [],
};

export const cafeReducer = (oldState: ICafeState = initialState, action: ICafeActions): ICafeState => {
    switch (action.type) {
        case LOAD_ORDERS:
            return {
                ...oldState,
                orderList: action.orderList,
            }

        case LOAD_FINISHED_ORDERS:
            return {
                ...oldState,
                finishedOrders: action.finishedOrders,
            }
        case LOAD_PAST_ORDERS:
            return {
                ...oldState,
                pastOrders: action.pastOrders,
            }

    }
    return oldState;
};