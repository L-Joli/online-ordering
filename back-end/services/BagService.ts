import knex from '../knex';
import { OrderPageService } from './OrderPageService';
import { ORDER_DETAIL } from './tables';


export class BagService {

    constructor(private orderPageService: OrderPageService) {
        
    }

    public listBagOrders = async (userId:number) => {
       return await this.orderPageService.listCustomerOrders(false, false, userId, true);

    }

    public deleteItem = async (id:number) => {
      return await (knex(ORDER_DETAIL).where({id}).update({isDeleted:true}));
    }

    public editNumberOfItems = async (id:number, num:number) => {
        return await (knex(ORDER_DETAIL).where({id}).update({quantity:num}));
      }

}

// const orderPageService = new OrderPageService();
// const bag = new BagService(orderPageService);
// bag.listBagOrders(64);



// select "order"."id" as "order_id", "users"."name" as "order_user", "taken_time" as "order_taken_time", "order_detail"."id" as "details_id", "quantity" as "details_quantity", "product"."name" as "details_product", "product"."price" as "details_productPrice", "option"."id" as "options_id", "option"."name" as "options_option", "product_option_price"."extra_charge" as "options_extraCharges" from "order" inner join "users" on "users"."id" = "users_id" inner join "order_detail" on "order_id" = "order"."id" inner join "product" on "product_id" = "product"."id" inner join "order_detail_option" on "order_detail"."id" = "order_detail_id" inner join "option" on "option_id" = "option"."id" inner join "product_option_price" on "product_option_price"."product_id" = "product"."id" and "option"."id" = "product_option_price"."option_id" where "finished" = false and "delivered" = false and "users"."id" = 9 and "isDeleted" = false and "stripe_receipt" is null order by "taken_time" desc