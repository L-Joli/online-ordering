export interface Card {
    id: string;
    brand: string;
    last4: string;
}

export interface ICardState {
    cards: Card[]
}