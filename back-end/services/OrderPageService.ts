import knex from '../knex';
import { ORDER_TABLE, USERS_TABLE, ORDER_DETAIL, PRODUCT_TABLE, ORDER_DETAIL_OPTION, OPTION_TABLE, PRODUCT_OPTION_PRICE } from './tables';
import joinJs from 'join-js';

const customerOrderSchema = [
    {
        mapId: 'orderMap',
        idProperty: 'id',
        properties: ['user','finished', 'taken_time', 'amount'],
        collections: [
            { name: 'details', mapId: 'detailsMap', columnPrefix: 'details_' }
        ]
    },
    {
        mapId: 'detailsMap',
        idProperty: 'id',
        properties: ['quantity', 'product', 'option', 'productPrice'/*, 'extraCharge'*/],
        collections: [
            { name: 'options', mapId: 'optionsMap', columnPrefix: 'options_' },
            //   { name: 'extraCharges', mapId: 'productOptionPriceMap', columnPrefix: 'productOptionPrice_' }
        ]
    },
    {
        mapId: 'optionsMap',
        idProperty: 'id',
        properties: ['option', 'extraCharges']
    },
    // {
    //     mapId: 'productOptionPriceMap',
    //     idProperty: 'id',
    //     properties: ['extraCharges']
    // }

]



export class OrderPageService {

 

    public listCurrentOrders = async (userId: number) => {
        let currentOrders = [];
        let finishedOrders = [];
        currentOrders = await this.listCustomerOrders(false, false, userId);
        finishedOrders = await this.listCustomerOrders(true, false, userId);
        return await currentOrders.concat(await finishedOrders);


    }

    public listPreviousOrders = async (userId: number) => {
        return this.listCustomerOrders(true, true, userId)
    }

    public listCustomerOrders = async (finished: boolean, delivered: boolean, userId: number, hasStripeReceipt: boolean = false) => {
        // select "order".id, users.name AS user,  taken_time, amount, quantity, product.name AS product, option.name AS option, product.price AS product_price, extra_charge
        // from "order" 
        // join users on users.id = users_id 
        // join order_detail on order_id = "order".id 
        // join product on product_id = product.id 
        // join order_detail_option on order_detail.id = order_detail_id 
        // join option on option_id = option.id 
        // join product_option_price on product_option_price.product_id = product.id 
        // where option.id = product_option_price.option_id
        // where finished = true AND users.id = '46'
        // order by taken_time desc;
        const orders = await (
            knex.select(
                {
                    "order_id": "order.id",
                    "order_finished": "finished",
                    "order_user": "users.name",
                    "order_taken_time": "taken_time",
                    "order_amount": "amount",

                    "details_id": "order_detail.id",
                    "details_quantity": "quantity",
                    "details_product": "product.name",
                    "details_productPrice": "product.price",

                    "options_id": "option.id",
                    "options_option": "option.name",

                    //"productOptionPrice_id": "product_option_price.id",
                    "options_extraCharges": "product_option_price.extra_charge"
                }
            )
                .from(ORDER_TABLE)
                .innerJoin(USERS_TABLE, "users.id", "users_id")
                .innerJoin(ORDER_DETAIL, "order_id", "order.id")
                .innerJoin(PRODUCT_TABLE, "product_id", "product.id")
                .leftJoin(ORDER_DETAIL_OPTION, "order_detail.id", "order_detail_id")
                .leftJoin(OPTION_TABLE, "option_id", "option.id")
                .leftJoin(PRODUCT_OPTION_PRICE, function () {
                    this
                        .on("product_option_price.product_id", "product.id")
                        .on("option.id", "product_option_price.option_id");
                })
                .where("finished", finished)
                .where("delivered", delivered)
                .where("users.id", userId)
                .where("isDeleted", false)
                .where("stripe_receipt", hasStripeReceipt ? "is" : "is not", null)
                .orderBy("taken_time", "desc"));

        const result = joinJs.map(orders, customerOrderSchema, 'orderMap', 'order_');

        // for (let detail of result[0].details)
        // console.log(result[0].details)
        return result;

    }


    public reOrder = async (userId: number, orderId: number) => {
        console.log("heyyyyyyyyyyyy",orderId, userId)
        let check = false;
        let checkOrderId;
        let count = (await knex.select(knex.raw('count(*)'))
        .from(ORDER_TABLE)
        .where('order.stripe_receipt',null)
        .where('users_id', userId).first() as Object)['count']
       
        if(count>0){
            checkOrderId = [(await knex.select('id')
            .from(ORDER_TABLE)
            .where('order.stripe_receipt',null)
            .andWhere('order.users_id',userId).first() as Object)['id']];
            console.log("COID",checkOrderId);
        }else{
            checkOrderId = await knex.insert({
                users_id: userId,
                finished: false,
                delivered: false
            }).into(ORDER_TABLE).returning('id')
        }
        
        
        // console.log(checkOrderId[0])

        //select order_detail.id from order_detail join "order" on order_id = "order".id where "order".id = 150;

        const orderDetails = await knex.select('order_detail.id', 'price_per_unit', 'product_id', 'quantity')
            .from(ORDER_DETAIL)
            .innerJoin(ORDER_TABLE, 'order.id', 'order_id')
            .where('order.id', orderId)
            .where('isDeleted', false);
        // console.log(orderDetails);//[{}]
        console.log("FCOID", checkOrderId)
       
        for (let orderDetail of orderDetails) {
           
          

           let newOrderDetailId = (await knex.insert({
                order_id: checkOrderId[0],
                price_per_unit: orderDetail.price_per_unit,
                product_id: orderDetail.product_id,
                quantity: orderDetail.quantity,
                myfav: false,
                isDeleted: false
            }).into(ORDER_DETAIL).returning('id'))[0]


            //select option_id from order_detail_option where order_detail_id = 178;
          let optionIds = await knex.select('option_id')
                .from(ORDER_DETAIL_OPTION)
                .where('order_detail_id', orderDetail.id);

            //  console.log('optionids', optionIds[0].option_id);
            // console.log(orderDetail.id)
            for(let optionId of optionIds){
                console.log('hi')
                await knex.insert({
                    option_id: optionId.option_id,
                    order_detail_id: newOrderDetailId
                }).into(ORDER_DETAIL_OPTION)
                
                check = true;
            }
            check = true;
        }


       return check;
       


 

    }






}

// const order = new OrderPageService();
// order.reOrder(106, 187);

// select "order"."id" as "order_id", "users"."name" as "order_user", "taken_time" as "order_taken_time", "amount" as "order_amount", "order_detail"."id" as "details_id", "quantity" as "details_quantity", "product"."name" as "details_product", "product"."price" as "details_productPrice", "option"."id" as "options_id", "option"."name" as "options_option", "product_option_price"."id" as "productOptionPrice_id", "product_option_price"."extra_charge" as "productOptionPrice_extraCharges" from "order" inner join "users" on "users"."id" = "users_id" inner join "order_detail" on "order_id" = "order"."id" inner join "product" on "product_id" = "product"."id" inner join "order_detail_option" on "order_detail"."id" = "order_detail_id" inner join "option" on "option_id" = "option"."id" inner join "product_option_price" on "product_option_price"."product_id" = "product"."id" and "option"."id" = "product_option_price"."option_id" where "finished" = false and "delivered" = false and "users"."id" = 60 and "isDeleted" = false and "stripe_receipt" is not null order by "taken_time" desc
