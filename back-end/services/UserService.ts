import * as Knex from 'knex';
import * as stripeLoader from 'stripe';
import {hashPassword} from '../hash'



export interface User {
  username: string,
  password: string,
  id: number,
}

export class UserService {
  constructor(private knex: Knex) {

  }
  private stripe = new stripeLoader('sk_test_4UoA2so88KhI2ANo44BI62gG002voj9FCS');

  public async getUserByUsername(username: string) {
    return await this.knex.select('*').from('users').where('name', username).first();
  }

  public async createFacebookUser(username: string, facebookId: number) {

    const customer = await this.stripe.customers.create({
      description: username + "account created by facebook"
    });

    // const test = await this.stripe.sources.create({
    //   type: 'ach_credit_transfer',
    //   currency: 'hkd'
    // });
    // console.log("customer", customer, customer.id);
    // console.log("test", test);

    return await this.knex.insert({
      name: username,
      facebook_id: facebookId,
      password: '',
      role: 'user',
      point: 0,
      progress: 0,
      stripe_id: customer.id
    }).into('users').returning(['id']);
  }


  public async getUserByFbId(facebookId: number) {
    return await this.knex.select('*').from('users').where('facebook_id', facebookId).first();
  }


  public async getUserById(id: number) {
    return await this.knex.select('*').from('users').where('id', id).first();
  }


  //create customer in DB:users table
  public async createStripeCustomerId(stripeId: string, userId: number) {
    return await this.knex.update({
      stripe_id: stripeId,
    }).where('user_id', userId);

  }


  // async addUsers(username:string, password:string){
  //   // Either insert or select 
  //   // return await this.knex.select('*').from<User>('user').insert({ username, password, user_email}).returning('id')
    
  //   return await this.knex('user').insert({username, password}).returning('id');
    
  // }



  public async addUsers(username: string, password: string) {

    const customer = await this.stripe.customers.create({
      description: username + "account created by website "
    });

    // const test = await this.stripe.sources.create({
    //   type: 'ach_credit_transfer',
    //   currency: 'hkd'
    // });
    // console.log("customer", customer, customer.id);
    // console.log("test", test);
    
    const hashedPassword:string = await hashPassword(password);

    return await this.knex.insert({
      name: username,
      facebook_id: '',
      password: hashedPassword,
      role: 'user',
      point: 0,
      progress: 0,
      stripe_id: customer.id
    }).into('users').returning(['id']);
  }


  // public createAccount = async (name: string, password: string) => {
  //   try {
  //     const count = ((await this.knex(this.usersTable).count('id').where({ name })).first()) as Object)['count'];
  //     if ((parseInt(count) === 0) && (password.length >= 8)) {
  //       console.log(password);
  //       const hashedPassword = await hashPassword(password);
  //       const userId: number = (await knex(this.usersTable)
  //         .insert({ name, password: hashedPassword }).returning('id'))[0];
  //       return userId;
  //     }
  //     throw new Error('duplicated username or email or password should be at least 8 characters');
  //   } catch (e) {
  //     console.error('error is found...');
  //     console.error(e.message);
  //     throw new Error(e.message);
  //   }
  // }
  
}