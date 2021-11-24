import { IItemState } from "./state";
import { IItemActions, } from "./actions";

const initialState = {
    item: [],
    product: [],
    option:[]
}

export function itemReducer(state: IItemState = initialState, action: IItemActions) {

    switch (action.type) {
        case "LIST_ITEM":
            return {
                ...state,
                item: action.item
            }
        case "LIST_PRODUCT":
            return {
                ...state,
                product: action.product
            }
        case "ADD_INFO":
            return {
                ...state,
                option: state.option.concat(action.option)
            }
        default:
            return state;
    }

}

