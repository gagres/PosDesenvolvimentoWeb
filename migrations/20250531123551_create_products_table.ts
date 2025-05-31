import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.transaction(async (trx) => {
        return knex.schema.createTable("products", (table) => {
            table.increments("id").primary();
            table.string("name").notNullable();
            table.text("description").notNullable();
            table.decimal("price", 10, 2).notNullable();
            table.string("category").notNullable();
            table.string("pictureUrl").notNullable();
            table.timestamps(true, true); // created_at and updated_at
        });
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("products");
}

