import { IItem, IProduct, IOption } from "./state";

export function listItem(item:IItem[]){
    return{
        type:"LIST_ITEM" as "LIST_ITEM",
        item
    }
}

export function listProduct(product:IProduct[]){
    return{
        type:"LIST_PRODUCT" as "LIST_PRODUCT",
        product
    }
}

export function addInfo(option:IOption){
    return{
        type:"ADD_INFO" as "ADD_INFO",
        option
    }
}

type itemActionsCreator = typeof listItem | typeof listProduct | typeof addInfo

export type IItemActions = ReturnType<itemActionsCreator>;