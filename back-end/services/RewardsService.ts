import knex from '../knex';
import { USERS_TABLE, DONATION_TABLE, USERS_DONATION_TABLE } from './tables';


export class HttpRequestError {
    constructor(public message: string) {

    }
}


export class RewardsService {

    public listDonationOrganization = async () => {
        const donationInfo = await (knex(DONATION_TABLE));

        return donationInfo;
    }

    public listUserInfo = async (id: number) => {
        const userInfo = await (knex.select('point', 'id', 'progress')
            .from(USERS_TABLE)
            .where({ id }));

        return userInfo;
    }

    public exchangeRewardsToDonation = async (id: number, donationId: number, progress:number) => {
       console.log("p",progress)
        const userPoints = await (knex.select('point')
            .from(USERS_TABLE)
            .where({ id }).first());

        const check = ((await knex(DONATION_TABLE).where({ id: donationId }).first()) as Object)['id'];

        if (check === undefined) {
            
            throw new Error;
        }


        if (userPoints['point'] < 100) {
            throw new HttpRequestError('Sorry, not enough points.');
        }
        else{
            const exchange = await (knex(USERS_DONATION_TABLE)
                .insert({ users_id: id, donation_id: donationId }))

            progress = progress +5;
            
            // select points from user
            const userPoint = await knex.select('point').from('users').where('id',id).returning(['point']);
            
            const updatedPoint:number = userPoint[0].point-100
            await (knex(USERS_TABLE).where({ id }).update({ point: updatedPoint , progress}));

            return exchange;

        } 



    }




}

