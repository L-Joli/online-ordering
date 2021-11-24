import { IRewardsActions, LOAD_REWARDS_INFO } from "./actions";
import { IRewardsState } from "./state";

const initialState: IRewardsState = {
    users: [],
    donation: []
    
};

export const rewardsReducer = (oldState: IRewardsState = initialState, action: IRewardsActions): IRewardsState => {
    switch (action.type) {
        case LOAD_REWARDS_INFO:
            return {
                ...oldState,
                users: action.users,
                donation: action.donation
            }



    }
    return oldState;
};