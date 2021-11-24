import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    const hasTable = await knex.schema.hasTable('order');
    if(hasTable){
        return knex.schema.alterTable('order',(table)=>{
           table.dateTime('taken_time');
    
        });  
    }else{
        return Promise.resolve();
    }
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.alterTable('order', (table) =>{
        table.dropColumn('taken_time');
        
    })
}