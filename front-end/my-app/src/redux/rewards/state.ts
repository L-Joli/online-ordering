export interface User {
    id: number;
    point: number;
    progress: number;
}

export interface Donation {
    id: number;
    organization: string;
    amount: number;
    img:string;
}

export interface IRewardsState {
    users: User[];
    donation: Donation[];
}
