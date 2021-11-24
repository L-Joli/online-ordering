import { ThunkDispatch, IRootState } from "../store";
import { loadCustomerOrders, loadPastOrders } from "./actions";
import { loadBagThunk } from "../bag/thunk";

export function loadCurrentOrdersThunk() {
    return async (dispatch: ThunkDispatch, getState: () => IRootState) => {
        let currentOrders;

        {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/ordersPage/current`, {
                headers: {
                    'Authorization': `Bearer ${getState().auth.token}`
                }
            });
            currentOrders = await res.json();

        }

        dispatch(loadCustomerOrders(currentOrders));

    };
};

export function loadPreviousOrdersThunk() {
    return async (dispatch: ThunkDispatch, getState: () => IRootState) => {
        let previousOrders;

        {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/ordersPage/previous`, {
                headers: {
                    'Authorization': `Bearer ${getState().auth.token}`
                }
            });
            previousOrders = await res.json();

        }

        dispatch(loadPastOrders(previousOrders));

    };
};

export function reOrderThunk(orderId:number) {
    return async (dispatch: ThunkDispatch, getState: () => IRootState) => {

  
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/ordersPage/reOrder/` + orderId, {
                method:'POST',
                headers: {
                    'Authorization': `Bearer ${getState().auth.token}`
                }
            });
          const result = await res.json();
          console.log(result)
        if (result === true){
            alert('Added to bag!');
            dispatch(loadBagThunk())
        }
      

    };
};