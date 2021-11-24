import * as Knex from 'knex';

export interface Product {

    id: number;
    name: string;
    image: string;
    price: number;
    img: string;
    product_category_id: number;
    created_at: Date;
    updated_date: Date;
  
}

export class MenuService {

    private productCategoryTable: string;
    private productTable: string;

    public constructor(private knex: Knex) {
        this.productCategoryTable = "product_category";
        this.productTable = "product";
    }

    public getCoffee = async () => {
      return await this.knex.select('product.id', 'product.name', 'product.image', 'product.price')
      .from(this.productTable)
      .innerJoin(this.productCategoryTable,'product.product_category_id','product_category.id')
      .where('product_category.name', 'Coffee')
    }

    public getSpecialDrink = async () => {
        return await this.knex.select('product.id', 'product.name', 'product.image', 'product.price')
        .from(this.productTable)
        .innerJoin(this.productCategoryTable,'product.product_category_id','product_category.id')
        .where('product_category.name', 'Special_drink')
      }
    
    public getBelgianChocolate = async () => {
        return await this.knex.select('product.id', 'product.name', 'product.image', 'product.price')
        .from(this.productTable)
        .innerJoin(this.productCategoryTable,'product.product_category_id','product_category.id')
        .where('product_category.name', 'Belgian_chocolate')
      }

      public getTea = async () => {
        return await this.knex.select('product.id', 'product.name', 'product.image', 'product.price')
        .from(this.productTable)
        .innerJoin(this.productCategoryTable,'product.product_category_id','product_category.id')
        .where('product_category.name', 'Tea')
      }

      public getSavoury= async () => {
        return await this.knex.select('product.id', 'product.name', 'product.image', 'product.price')
        .from(this.productTable)
        .innerJoin(this.productCategoryTable,'product.product_category_id','product_category.id')
        .where('product_category.name', 'Savoury')
      }

      public getSweet= async () => {
        return await this.knex.select('product.id', 'product.name', 'product.image', 'product.price')
        .from(this.productTable)
        .innerJoin(this.productCategoryTable,'product.product_category_id','product_category.id')
        .where('product_category.name', 'Sweet')
      }
    


   

    

}

