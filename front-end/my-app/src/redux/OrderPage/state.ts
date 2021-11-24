export interface CustomerOrder {
    id: number;
    user: string;
    finished:boolean;
    taken_time: string;
    amount: string;
    details: {
        id:number;
        quantity: number;
        product: string;
        productPrice:string;
        options: {
            id:number;
            option:string;
            extraCharges:string;
        }[];
    }[]
}




export interface IOrderPageState {
    customerOrders: CustomerOrder[];
    pastOrders:CustomerOrder[];
}