import { IDrinkState } from "./state";
import { IDrinkActions, } from "./actions";

const initialState = {
    drinks: [],
}

export function drinkReducer(state:IDrinkState = initialState, action:IDrinkActions){

    switch(action.type){
        case "LIST_DRINKS":
            return {
                ...state,
                drinks: action.drinks
            }
        case "RESET_DRINKS":

                return {
                    ...state,
                    drinks: []
                }
        default:
            return state;
    }

}