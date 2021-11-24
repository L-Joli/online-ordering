export interface Order {
    id: number;
    user: string;
    taken_time: string;
    amount: string;
    details: {
        id:number;
        quantity: number;
        product: string;
        options: {
            id:number;
            option:string
        }[];
    }[]
}

export interface FinishedOrder {
    id: number;
    user: string;
    taken_time: string;
    amount: string;
    details: {
        id:number;
        quantity: number;
        product: string;
        options: {
            id:number;
            option:string
        }[];
    }[]
}

export interface PastOrder {
    id: number;
    user: string;
    taken_time: string;
    amount: string;
    details: {
        id:number;
        quantity: number;
        product: string;
        options: {
            id:number;
            option:string
        }[];
    }[]
}

export interface ICafeState {
    orderList: Order[];
    finishedOrders: FinishedOrder[];
    pastOrders: PastOrder[];
}