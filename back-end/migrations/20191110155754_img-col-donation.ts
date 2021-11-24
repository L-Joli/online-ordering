import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    const hasTable = await knex.schema.hasTable('donation');
    if(hasTable){
        return knex.schema.alterTable('donation',(table)=>{
           table.string('img');
        });  
    }else{
        return Promise.resolve();
    }
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.alterTable('donation', (table) =>{
        table.dropColumn('img');
    })
}