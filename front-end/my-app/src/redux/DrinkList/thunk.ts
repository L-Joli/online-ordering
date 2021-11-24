import { ThunkDispatch } from "../store";
import {  listDrinks } from "./actions";




export function listDrinksThunk(type:string){
    return async(dispatch:ThunkDispatch) =>{
        
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/menu/${type}`);
        const result = await res.json();

            dispatch(listDrinks(result.data));
    }
}


