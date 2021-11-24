import { ICardState } from "./state";
import { ICardActions, DLETE_CARD_INFO } from "./action";
import { LOAD_CARDLIST_INFO } from "./action";
import { AuthActions, LOGOUT } from "../auth/actions";

const initialState = {
    cards: [],
}

export function cardReducer(state:ICardState = initialState, action:ICardActions|AuthActions) {

    switch(action.type){
        case LOAD_CARDLIST_INFO:
            return {
                ...state,
                cards: action.cards
            }
        case DLETE_CARD_INFO:
            return {
                ...state,
                cards: state.cards.filter((card) => card.id !== action.cardId)
            }
        case LOGOUT:
                return {
                    cards:[]
                }
        default:
            return state;
    }

}