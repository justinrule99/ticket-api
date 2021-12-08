import {getDBConnection} from "../utils/db-connect.js";
import {getFootballEvents} from "../utils/parse-events.js";

const knex = getDBConnection();

export const findEventById = (id) => {
    // knex call here - inject db client

}

export const saveFootballEvents = async () => {
    const events = await getFootballEvents();

    events.map(async (event) => {
        await knex('events').insert(event)
    });

    return events;
}

export const saveEvent = (event) => knex('events').insert(event);