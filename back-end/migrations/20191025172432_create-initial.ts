import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.string('name').notNullable();
        table.string('password').notNullable();
        table.string('facebook_id')
        table.string('role').notNullable();
        table.integer('point').notNullable();
        table.string('stripe_id');
        table.timestamps(false,true);
    })

    await knex.schema.createTable('donation', (table) => {
        table.increments('id');
        table.string('organization');
        table.decimal('amount'); //decimal
        table.timestamps(false,true);
    })

    await knex.schema.createTable('option_category', (table) => {
        table.increments('id');
        table.string('name');
        table.timestamps(false,true);
    })

    await knex.schema.createTable('product_category', (table) => {
        table.increments('id');
        table.string('name');
        table.timestamps(false,true);
    })

    await knex.schema.createTable('users_donation', (table) => {
        table.increments('id');
        table.integer('users_id').unsigned();
        table.foreign('users_id').references('users.id');
        table.integer('donation_id').unsigned();
        table.foreign('donation_id').references('donation.id');
        table.timestamps(false,true);
    })

    await knex.schema.createTable('option', (table) => {
        table.increments('id');
        table.string('name');
        table.integer('option_category_id').unsigned();
        table.foreign('option_category_id').references('option_category.id');
        table.timestamps(false,true);
    })

    await knex.schema.createTable('product', (table) => {
        table.increments('id');
        table.string('name');
        table.string('image');
        table.decimal('price');
        table.integer('product_category_id').unsigned();
        table.foreign('product_category_id').references('product_category.id');
        table.timestamps(false,true);
    })

    await knex.schema.createTable('product_option_price', (table) => {
        table.increments('id');
        table.decimal('extra_charge'); // decimal
        table.integer('product_id').unsigned();
        table.foreign('product_id').references('product.id');
        table.integer('option_id').unsigned();
        table.foreign('option_id').references('option.id');
        table.timestamps(false,true);
    })

    await knex.schema.createTable('order', (table) => {
        table.increments('id');
        table.time('taken_time');
        table.decimal('amount'); //decimal
        table.boolean('finished').notNullable();
        table.boolean('delivered').notNullable();
        table.string('stripe_receipt');
        table.integer('users_id').unsigned();
        table.foreign('users_id').references('users.id');
        table.timestamps(false,true);
    })

    await knex.schema.createTable('order_detail', (table) => {
        table.increments('id');
        table.decimal('price_per_unit');
        table.integer('quantity');
        table.boolean('myfav').notNullable();
        table.integer('order_id').unsigned();
        table.foreign('order_id').references('order.id');
        table.integer('product_id').unsigned();
        table.foreign('product_id').references('product.id');
        table.timestamps(false,true);
    })

    await knex.schema.createTable('order_detail_option', (table) => {
        table.increments('id');
        table.integer('order_id').unsigned();
        table.foreign('order_id').references('order.id');
        table.integer('order_detail_id').unsigned();
        table.foreign('order_detail_id').references('order_detail.id');
        table.timestamps(false,true);
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('order_detail_option');
    await knex.schema.dropTable('order_detail');
    await knex.schema.dropTable('order');
    await knex.schema.dropTable('product_option_price');
    await knex.schema.dropTable('product');
    await knex.schema.dropTable('option');
    await knex.schema.dropTable('users_donation');
    await knex.schema.dropTable('product_category');
    await knex.schema.dropTable('option_category');
    await knex.schema.dropTable('donation');
    await knex.schema.dropTable('users');
}

