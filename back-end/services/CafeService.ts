import knex from '../knex';
import { ORDER_TABLE, USERS_TABLE, ORDER_DETAIL, PRODUCT_TABLE, ORDER_DETAIL_OPTION, OPTION_TABLE } from './tables';
import joinJs from 'join-js';


const cafeOrderSchema = [
    {
        mapId: 'orderMap',
        idProperty: 'id',
        properties: ['user', 'taken_time', 'amount'],
        collections: [
            { name: 'details', mapId: 'detailsMap', columnPrefix: 'details_' }
        ]
    },
    {
        mapId: 'detailsMap',
        idProperty: 'id',
        properties: ['quantity', 'product', 'options'],
        collections: [
            { name: 'options', mapId: 'optionsMap', columnPrefix: 'options_' }
        ]
    },
    {
        mapId: 'optionsMap',
        idProperty: 'id',
        properties: ['option']
    }
]

export class CafeService {

    public listCurrentOrders = async () => {
        return this.listOrder()
    }

    public listFinishedOrders = async () => {
        return this.listOrder(true, false)
    }

    public listPastOrders = async () => {
        return this.listOrder(true, true)
    }

    private listOrder = async (finished: boolean = false, delivered: boolean = false) => {
        // select "order".id, users.name AS user,  taken_time, amount, quantity, product.name AS product, option.name AS option 
        // from "order" 
        // join users on users.id = users_id 
        // join order_detail on order_id = "order".id 
        // join product on product_id = product.id 
        // join order_detail_option on order_detail.id = order_detail_id 
        // join option on option_id = option.id 
        // where finished = false 
        // order by taken_time desc;
        const past = await (
            knex.select(
                {
                    "order_id": "order.id",
                    "order_user": "users.name",
                    "order_taken_time": "taken_time",
                    "order_amount": "amount",
                    "details_id": "order_detail.id",
                    "details_quantity": "quantity",
                    "details_product": "product.name",
                    
                    "options_id": "option.id",
                    "options_option": "option.name",
                }
            )
                .from(ORDER_TABLE)
                .innerJoin(USERS_TABLE, "users.id", "users_id")
                .innerJoin(ORDER_DETAIL, "order_id", "order.id")
                .innerJoin(PRODUCT_TABLE, "product_id", "product.id")
                .leftJoin(ORDER_DETAIL_OPTION, "order_detail.id", "order_detail_id")
                .leftJoin(OPTION_TABLE, "option_id", "option.id")
                .where("finished", finished)
                .where("delivered", delivered)
                .where("isDeleted", false)
                .whereNotNull("stripe_receipt")
                .orderBy("taken_time", "desc"));
        const result = joinJs.map(past, cafeOrderSchema, 'orderMap', 'order_');
        return result;
    }

    // public updateOrder = async (orderId: number, column: { [key:string]: boolean }[]) => {
    //     return await (knex(ORDER_TABLE).update(column).where({ id: orderId }))
    // }

    public finishOrder = async (orderId: number) => {
        return await (knex(ORDER_TABLE).update({ finished: true }).where({ id: orderId }))
    }

    public deliverOrder = async (orderId: number) => {
        return await (knex(ORDER_TABLE).update({ delivered: true }).where({ id: orderId }))
    }
}

// select "order"."id" as "order_id", "users"."name" as "order_user", "taken_time" as "order_taken_time", "amount" as "order_amount", "order_detail"."id" as "details_id", "quantity" as "details_quantity", "product"."name" as "details_product", "option"."name" as "details_option", "product"."price" as "details_productPrice", "product_option_price"."extra_charge" as "details_extraCharge" from "order" inner join "users" on "users"."id" = "users_id" inner join "order_detail" on "order_id" = "order"."id" inner join "product" on "product_id" = "product"."id" inner join "order_detail_option" on "order_detail"."id" = "order_detail_id" inner join "option" on "option_id" = "option"."id" inner join "product_option_price" on "product_option_price"."product_id" = "product"."id" and "option"."id" = "product_option_price"."option_id" where "finished" = false and "delivered" = false and "users"."id" = 56 and "isDeleted" = false and "stripe_receipt" is not null order by "taken_time" desc