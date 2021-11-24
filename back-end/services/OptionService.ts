import * as Knex from 'knex';
import joinJs from 'join-js';

export interface choice {
    id: string,
    qty: number,
    selectedOption: { [key: number]: { [key: number]: boolean } }
}


const resultMaps = [
    {
        mapId: 'categoryMap',
        idProperty: 'id',
        properties: ['categoryName', 'itemName', 'itemPrice'],
        collections: [
            { name: 'options', mapId: 'optionMap', columnPrefix: 'option_' }
        ]
    },
    {
        mapId: 'optionMap',
        idProperty: 'id',
        properties: ['optionName', 'extraCharge']
    }
]

function getKeyByValue(object:{}, value:boolean) {
    return Object.keys(object).find(key => object[key] === value);
  }
  

export class OptionService {

    private optionTable: string;
    private optionCategoryTable: string;
    private productOptionPriceTable: string;
    private productTable: string;
    private orderTable: string;
    private orderDetailTable: string;
    private orderDetailOptionTable: string;



    public constructor(private knex: Knex) {
        this.optionTable = "option";
        this.optionCategoryTable = "option_category";
        this.productOptionPriceTable = "product_option_price"
        this.productTable = "product"
        this.orderTable = "order"
        this.orderDetailTable = "order_detail"
        this.orderDetailOptionTable = "order_detail_option"
    }

    public getCategory = async (id: number) => {
        const categories = await this.knex.select({
            'category_id': 'option_category.id',
            'category_categoryName': 'option_category.name',
            'category_itemName': 'product.name',
            'category_itemPrice': 'product.price',
            'option_id': 'option.id',
            'option_optionName': 'option.name',
            'option_extraCharge': 'extra_charge'
        })
            .from(this.optionCategoryTable)
            .innerJoin(this.optionTable, 'option.option_category_id', 'option_category.id')
            .innerJoin(this.productOptionPriceTable, 'option.id', 'product_option_price.option_id')
            .innerJoin(this.productTable, 'product.id', 'product_option_price.product_id')
            .where('product_option_price.product_id', id)


        return joinJs.map(categories, resultMaps, 'categoryMap', 'category_')

    }

    public getProduct = async (id: number) => {
        return await this.knex.select('product.id', 'product.name', 'product.image', 'product.price')
            .from(this.productTable)
            .where('product.id', id)
    }

    
    public addChoice = async (id:number,choice: choice) => {
        const productID = choice.id
        const qty =choice.qty
        const userID = id
       
        const option = Object.values(choice.selectedOption) //e.g. [ { '54': false, '55': true },{ '53': false, '52': true }] or [] (if no option)
        const optionID = option.map(i=>getKeyByValue(i,true)) //e.g. [ '55','52'] or [] (if no option)
        // console.log(productID)
        // console.log(qty)
        // console.log(userID) 
        // console.log(option)
        // console.log(optionID)
        

        // find price_per_unit
        const price = await this.knex.select('price').from(this.productTable).where('product.id', productID)
       // console.log(price)
        // add order
         await this.knex.insert({
            users_id: userID,
            finished:false,
            delivered:false
        }).into(this.orderTable).returning(['id'])
        
        const orderID = await this.knex.select('id').from(this.orderTable).where('order.stripe_receipt',null).andWhere('order.users_id',userID)

       // console.log(orderID)
        //add order detail
        const detailID = await this.knex.insert({
            order_id: orderID[0].id,
            price_per_unit: price[0].price,
            product_id:productID,
            quantity:qty,
            myfav:false,
            isDeleted:false
        }).into(this.orderDetailTable).returning(['id'])
        
        //add order detail option
     if (optionID.length !== 0){
         for (var i=0;i<optionID.length;i++){
            await this.knex.insert({
                option_id:optionID[i],
                order_detail_id:detailID[0].id
            }).into(this.orderDetailOptionTable)
         }
     }

        return true
    }
}

