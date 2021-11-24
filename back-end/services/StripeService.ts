import * as Knex from 'knex';


export class StripeService {

    constructor(private knex: Knex) {

    }

    // //POST create customer in DB:users table
    // public async createCustomer(stripeId:number) {
    //     return await this.knex.insert({
    //         stripe_id: stripeId
    //     }).into('users').returning(['id']);

    // }

    public async getUserId(userId: number): Promise<[number, string]> {
        return await this.knex.select('id','stripe_id').from('users').where('id', userId).first();
    }



}