import { ThunkDispatch, IRootState } from "../store";
import { loadOrders, loadPastOrders, loadFinishedOrders } from "./actions";

export function loadCurrentOrdersThunk() {
    return async (dispatch: ThunkDispatch, getState: () => IRootState) => {
        let currentOrders;

        {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/cafe/current`, {
                headers: {
                    'Authorization': `Bearer ${getState().auth.token}`
                }
            });
            currentOrders = await res.json();

        }

        dispatch(loadOrders(currentOrders));

    };
};

export function loadFinishedOrdersThunk() {
    return async (dispatch: ThunkDispatch, getState: () => IRootState) => {
        let finishedOrders;

        {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/cafe/finished`, {
                headers: {
                    'Authorization': `Bearer ${getState().auth.token}`
                }
            });
            finishedOrders = await res.json();

        }

        dispatch(loadFinishedOrders(finishedOrders));

    };
};

export function loadPastOrdersThunk() {
    return async (dispatch: ThunkDispatch, getState: () => IRootState) => {
        let pastOrders;

        {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/cafe/past`, {
                headers: {
                    'Authorization': `Bearer ${getState().auth.token}`
                }
            });
            pastOrders = await res.json();

        }

        dispatch(loadPastOrders(pastOrders));

    };
};

export function finishOrderThunk(orderId:number) {
    return async (dispatch: ThunkDispatch, getState: () => IRootState) => {
      

        {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/cafe/current/` + orderId, {
                method:'PUT',
                headers: {
                    'Authorization': `Bearer ${getState().auth.token}`,
                    "Content-Type": "application/json; charset=utf-8"
                }
            });
            await res.json();

        }

        dispatch(loadCurrentOrdersThunk());

    };
};


export function deliverOrderThunk(orderId:number) {
    return async (dispatch: ThunkDispatch, getState: () => IRootState) => {
      

        {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/cafe/finished/` + orderId, {
                method:'PUT',
                headers: {
                    'Authorization': `Bearer ${getState().auth.token}`,
                    "Content-Type": "application/json; charset=utf-8"
                }
            });
            await res.json();

        }

        dispatch(loadFinishedOrdersThunk());

    };
};