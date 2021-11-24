import { ThunkDispatch, IRootState } from "../store";
import { loadCardList, deleteCard } from "./action"



// export function AddCardThunk() {
//     return async (dispatch: ThunkDispatch, getState: () => IRootState) => {

//         {               
//             let { token } = await this.props.stripe.createToken({ name: this.state.name });
//             const res = await fetch (`${process.env.REACT_APP_API_SERVER}/stripe/addcard/`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-type': 'application/json',
//                     'Authorization': `Bearer ${getState().auth.token}`
//                 },
//                 body: JSON.stringify({ name, token })
//             })

//             if (res.status === 200) {
//                 const cards = await res.json();
//                 dispatch(loadCardList(cards));
//             } else {
//                 // dispatch(fail());
//             }
//         }

//     };
// };





export function fetchCardList() {
    return async (dispatch: ThunkDispatch, getState: () => IRootState) => {

        
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/stripe/getcard`, {
                headers: {
                    'Authorization': `Bearer ${getState().auth.token}`
                }
            });

            if (res.status === 200) {
                const cards = await res.json();
                dispatch(loadCardList(cards));
            } else {
                // dispatch(fail());
            }
        

    };
};

export function deleteCardThunk(cardId:string) {
    return async (dispatch: ThunkDispatch, getState: () => IRootState) => {



        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/stripe/deletecard/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getState().auth.token}`,
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                id: cardId
            })
        });
       await res.json();

        if (res.status === 200) {
            // alert(result.message);
            dispatch(deleteCard(cardId));
            
        } else {
            // dispatch(fail());

        }

    };
};