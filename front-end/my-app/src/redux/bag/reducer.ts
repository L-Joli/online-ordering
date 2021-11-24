import { IBagState } from "./state";
import { IBagActions, LOAD_BAG } from "./actions";
import { LOGOUT, AuthActions } from "../auth/actions";

const initialState = {
    bags: []
}

export function bagReducer(oldState:IBagState = initialState, action:IBagActions|AuthActions) {

    switch(action.type){
        case LOAD_BAG:
            return {
                ...oldState,
                bags: action.bags,
            }
         case LOGOUT:
                return {
                    bags: []
                }
        default:
            return oldState;
    }
}
