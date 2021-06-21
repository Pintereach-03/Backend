exports.up = (knex) => {
    return knex.schema
        .createTable('users', table => {
            table.increments();
            table.text('username', 255)
                .notNullable()
                .unique();
            table.text('password', 255)
                .notNullable();
        })
        .createTable('articles', table => {
            table.increments();
            table.text('title')
                .notNullable();
            table.text('link')
                .notNullable();
            table.text('description')
                .notNullable();
            table.text('category')
                .nullable();
            table.timestamp('created_at')
                .defaultTo(knex.fn.now());
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('categories', table => {
            table.increments();
            table.text('name')
                .notNullable()
                .unique();
            table.timestamp('created_at')
                .defaultTo(knex.fn.now());
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        });
};

exports.down = (knex) => {
    return knex.schema
        .dropTableIfExists('categories')
        .dropTableIfExists('articles')
        .dropTableIfExists('users');
};
