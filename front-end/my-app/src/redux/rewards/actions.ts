import { User, Donation } from './state';
export const LOAD_REWARDS_INFO = 'LOAD_REWARDS_INFO';

export interface ILoadRewardsAction {
    type: typeof LOAD_REWARDS_INFO;
    users: User[];
    donation: Donation[];
}






export type IRewardsActions = ILoadRewardsAction ;


export function loadRewards(users:User[], donation:Donation[]): ILoadRewardsAction {
    return {
        type: LOAD_REWARDS_INFO, 
        users, 
        donation
    }
}



