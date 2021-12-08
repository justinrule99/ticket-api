import knex from 'knex';
import {DB_PASSWORD, DB_USER, PI_HOST, dev, LOCALHOST} from "../env.js";

export const getDBConnection = () => knex({
    client: 'mysql',
    connection: {
        host: dev ? LOCALHOST : PI_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: 'ticket_db'
    }
});

// require auth later
export const adminFunction = async (req, res) => {
    try {
        await createEvents(getDBConnection());
        res.send('success');
    } catch (error) {
        res.send(error);
    }
}

export const initDb = async (req, res) => {
    const connection = getDBConnection();

    try {
        await createUsers(connection);
        await createEvents(connection);
        await createTickets(connection);
        res.send('success');
    } catch (error) {
        res.send(error);
    }
}

const createUsers = (db) => db.schema.createTable('users', (table) => {
    table.increments();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('venmo');
    table.string('phone');
    table.timestamp('created_date')
        .notNullable()
        .defaultTo(db.fn.now());
});

const createEvents = (db) => db.schema.createTable('events', (table) => {
    table.increments();
    table.string('sport');
    table.string('opponent');
    table.boolean('home');
    table.dateTime('date');
    table.timestamp('created_date')
        .notNullable()
        .defaultTo(db.fn.now());
});

const createTickets = (db) => db.schema.createTable('tickets', (table) => {
    table.increments();
    table.integer('event')
        .references("id")
        .inTable("events")
        .onDelete("CASCADE");
    table.decimal('price', 2, 2);
    table.boolean('is_active')
        .defaultTo(true);
    table.integer('seller')
        .references('id')
        .inTable('users');
    table.timestamp('created_date')
        .notNullable()
        .defaultTo(db.fn.now());
});

