import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    const hasTable = await knex.schema.hasTable('order_detail_option');
    if(hasTable){
        return knex.schema.alterTable('order_detail_option',(table)=>{
           table.renameColumn('order_id', 'option_id');
    
        });  
    }else{
        return Promise.resolve();
    }
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.alterTable('order_detail_option', (table) =>{
        table.renameColumn('option_id', 'order_id');
        
    })
}