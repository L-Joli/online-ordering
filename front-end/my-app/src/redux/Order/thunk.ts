import { ThunkDispatch, IRootState } from "../store";
import { createOrderSuccess } from "./action"
import { loadBagThunk } from "../bag/thunk";
import { loadCurrentOrdersThunk } from "../OrderPage/thunk";
// import { loadCurrentOrdersThunk } from "../Cafe/thunk";


export function createOrderRemote(amount: number, cardId: string,orderID:number,dateString:string,pointsForUser:number) {
    return async (dispatch: ThunkDispatch, getState: () => IRootState) => {

        
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/order`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getState().auth.token}`,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    amount,
                    cardId,
                    orderID,
                    dateString,
                    pointsForUser
                })
            });

        if (res.status === 200) {
            const message = await res.json();
            dispatch(createOrderSuccess(message));
            dispatch(loadCurrentOrdersThunk());
            dispatch(loadBagThunk());
        } else {
            // dispatch(fail());
        }

    };
};
