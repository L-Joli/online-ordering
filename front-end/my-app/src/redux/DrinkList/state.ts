export interface IDrink{
    id:number,
    name:string,
    image:string,
    price:number
}


export interface IDrinkState{
    drinks: IDrink[]
}