import { IOrderState } from "./state";
import { IOrderActions, CREATE_ORDER_SUCCESS, SELECT_CARD_BY_DRAWER } from "./action";

const initialState = {
    message: '',
    selectedCard: ''
}


export function orderReducer(state: IOrderState = initialState, action: IOrderActions): IOrderState{
  //  console.log(state)
    switch (action.type) {
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                message: action.message
            }
        case SELECT_CARD_BY_DRAWER:
          //      console.log("reducer" + action.selectedCard)
            return {
                ...state,
                selectedCard: action.selectedCard
            }

        default:
            return state;
    }
}
