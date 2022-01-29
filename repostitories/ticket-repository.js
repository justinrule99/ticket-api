import {getDBConnection} from "../utils/db-connect.js";


const knex = getDBConnection();

export const findAllTickets = () => {
    return knex('tickets');
}

export const saveTicket = (ticket) => knex('tickets').insert(ticket);