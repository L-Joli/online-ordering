import { Card } from "./state";
export const LOAD_CARDLIST_INFO = 'LOAD_CARDLIST_INFO';
export const DLETE_CARD_INFO = 'DLETE_CARD_INFO';


export interface ILoadCardListAction {
    type: typeof LOAD_CARDLIST_INFO;
    cards: Card[]
}

export interface IDeleteCardAction {
    type: typeof DLETE_CARD_INFO;
    cardId: string
}



export type ICardActions = ILoadCardListAction | IDeleteCardAction


export function loadCardList(cards: Card[]): ILoadCardListAction {
    return {
        type: LOAD_CARDLIST_INFO, 
        cards
    }
}
export function deleteCard(cardId: string): IDeleteCardAction {
    return {
        type: DLETE_CARD_INFO, 
        cardId
    }
}






