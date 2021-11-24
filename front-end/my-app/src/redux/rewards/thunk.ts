import { ThunkDispatch, IRootState } from "../store";
import { loadRewards } from "./actions"
import { generalAlert } from "../alertStyle/actions";

export function fetchRewards() {
    return async (dispatch: ThunkDispatch, getState: () => IRootState) => {
        let donation, user;

        {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/rewards`, {
                headers: {
                    'Authorization': `Bearer ${getState().auth.token}`
                }
            });
            donation = await res.json();

        }
        {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/rewards/points`, {
                headers: {
                    'Authorization': `Bearer ${getState().auth.token}`
                }
            });
            user = await res.json();
        }

        dispatch(loadRewards(user, donation));

    };
};

export function exchangeRewardsThunk(donationId: number, progress: number) {
    return async (dispatch: ThunkDispatch, getState: () => IRootState) => {



        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/rewards/` + donationId, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getState().auth.token}`,
                "Content-Type": "application/json; charset=utf-8"

            },
            body: JSON.stringify({
                progress: progress
            })
        });
        const result = await res.json();
        
        if (result.status === "reqError") {
            // alert(result.message);
            dispatch(generalAlert(result.message));
        }else{
            dispatch(generalAlert("Thank you!"));
        }




        dispatch(fetchRewards());


    };
};