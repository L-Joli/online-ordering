import { IDrink } from "./state";

export function listDrinks(drinks:IDrink[]){
    return{
        type:"LIST_DRINKS" as "LIST_DRINKS",
        drinks
    }
}

export function resetDrinks(){
    return {
        type:"RESET_DRINKS" as "RESET_DRINKS",
      
    }
}

type drinkActionsCreator = typeof listDrinks | typeof resetDrinks

export type IDrinkActions = ReturnType<drinkActionsCreator>;