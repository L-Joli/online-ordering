
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const SELECT_CARD_BY_DRAWER = 'SELECT_CARD_BY_DRAWER';

export interface ICreateOrderAction {
    type: typeof CREATE_ORDER_SUCCESS;
    message: string
}

export interface ISelectCardAction {
    type: typeof SELECT_CARD_BY_DRAWER;
    selectedCard: string
}



export type IOrderActions = ICreateOrderAction | ISelectCardAction


export function createOrderSuccess(message: string): ICreateOrderAction {
    return {
        type: CREATE_ORDER_SUCCESS,  
        message
    }
}

export function selectCardByDrawer(selectedCard: string): ISelectCardAction {
  //  console.log("action: " + selectedCard)
    return {
        type: SELECT_CARD_BY_DRAWER,
        selectedCard
    }
}