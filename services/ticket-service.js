import {findAllTickets, saveTicket} from "../repostitories/ticket-repository.js";


export const getAllTickets = async (req, res) => {
    try {
        const tickets = await findAllTickets();

        return res.json(tickets);
    } catch(err) {
        console.log(err);
        return res.status(500).send({
            message: 'Error: Could not retrieve tickets.'
        });
    }
}

export const getTicketsForEvent = async (req, res) => {

}

export const createTicket = async (req, res) => {
    // have object in req.body
    // sanitize input before insert

    try {
        const ticket = await saveTicket(req.body);
        console.log(req.body);

        res.json(ticket);
    } catch (err) {
        console.log(err);
        console.log('error inserting ticket');
        res.send('error');
    }
}

export const deleteTicketById = async (req, res) => {

}

