import { CustomerOrder } from "../OrderPage/state";
export const LOAD_BAG = 'LOAD_BAG';

export interface ILoadBagAction {
    type: typeof LOAD_BAG;
    bags: CustomerOrder[];
}




export type IBagActions = ILoadBagAction ;

export function loadBag(bags: CustomerOrder[]): ILoadBagAction {
    return {
        type: LOAD_BAG, 
        bags
    }
}