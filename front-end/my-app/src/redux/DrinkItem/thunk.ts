import { ThunkDispatch, IRootState } from "../store";
import { listItem, listProduct, addInfo } from "./actions";
import { loadBagThunk } from "../bag/thunk";




export function listItemThunk(id: string) {
    return async (dispatch: ThunkDispatch) => {

        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/options/option_category/${id}`);
        const result = await res.json();

        dispatch(listItem(result.data));
    }
}

export function listProductThunk(id: string) {
    return async (dispatch: ThunkDispatch) => {

        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/options/product/${id}`);
        const result = await res.json();

        dispatch(listProduct(result.data));
    }
}

export function addInfoThunk(id: string, qty: number, selectedOption: { [key: number]: { [key: number]: boolean } }) {
    return async (dispatch: ThunkDispatch, getState: () => IRootState) => {

        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/options/choice`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${getState().auth.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                qty,
                selectedOption
            })
        });


        if (res.status === 200){
            dispatch(addInfo({
                id: id,
                qty: qty,
                selectedOption: selectedOption
            }));
            dispatch(loadBagThunk())
        }
    }
}

