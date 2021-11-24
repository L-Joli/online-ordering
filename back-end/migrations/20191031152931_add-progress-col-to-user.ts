import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    const hasTable = await knex.schema.hasTable('users');
    if(hasTable){
        return knex.schema.alterTable('users',(table)=>{
           table.integer('progress').notNullable;
        });  
    }else{
        return Promise.resolve();
    }
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.alterTable('users', (table) =>{
        table.dropColumn('progress');
    })
}