import {findEventById, saveEvent, saveFootballEvents} from "../repostitories/event-repository.js";
import {getFootballEvents} from "../utils/parse-events.js";


// do req, res callback here
export const getAllEvents = async (req, res) => {

    const football = getFootballEvents();

    res.send('hello from service');
    return 'hello';
}

export const getEventByDate = async (req, res) => {

}

export const getEventById = async (req, res) => {

    const event = await findEventById(req.params.eventId);
}

export const createIsuFootball = async (req, res) => {

    try {
        const events = await saveFootballEvents();

        return res.json(events);
    } catch (err) {
        console.log(err);
        res.send('error');
    }
}

export const createEvent = async (req, res) => {
    // do mapping here?
    console.log(req.body);

    try {
        const event = await saveEvent(req.body);

        res.json(event);
    } catch (err) {
        console.log(err);
        res.send('error');
    }
}



