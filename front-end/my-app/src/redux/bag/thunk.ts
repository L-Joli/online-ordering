import { ThunkDispatch, IRootState } from "../store";
import { loadBag } from "./actions";

export function loadBagThunk() {
    return async (dispatch: ThunkDispatch, getState: () => IRootState) => {


        
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/bag`, {
                headers: {
                    'Authorization': `Bearer ${getState().auth.token}`
                }
            });
           const bagItems = await res.json();

        

        dispatch(loadBag(bagItems));

    };
};

export function editQuantityThunk(itemId:number, num:number) {
    return async (dispatch: ThunkDispatch, getState: () => IRootState) => {


        
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/bag/` +itemId, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${getState().auth.token}`,
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    num
                })
            });
            await res.json();

        


        dispatch(loadBagThunk());
    };
};

export function deleteItemThunk(itemId:number) {
    return async (dispatch: ThunkDispatch, getState: () => IRootState) => {


        
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/bag/` +itemId, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getState().auth.token}`
                }
            });
          await res.json();

        

     
        dispatch(loadBagThunk());
    };
};