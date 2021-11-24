import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    const hasTable = await knex.schema.hasTable('order_detail');
    if(hasTable){
        return knex.schema.alterTable('order_detail',(table)=>{
           table.boolean('isDeleted').notNullable;
        });  
    }else{
        return Promise.resolve();
    }
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.alterTable('order_detail', (table) =>{
        table.dropColumn('isDeleted');
    })
}