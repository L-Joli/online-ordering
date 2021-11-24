
export interface IItemState{
    item: IItem[],
    product: IProduct[],
    option: IOption[]
}

export interface IProduct{
    id: number,
    name: string,
    image:string,
    price:string,
}

export interface IItem{
    id: number,
    categoryName: string,
    itemName:string,
    itemPrice:string,
    options: 
        {
            id: number,
            optionName: string,
            extraCharge: string
        }[],   
}

export interface IOption{
    id: string,
    qty:number,
    selectedOption: { [key: number]: { [key: number]: boolean } },
}