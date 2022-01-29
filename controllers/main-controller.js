import express from 'express';
import {createEvent, createIsuFootball, getAllEvents, getEventByDate, getEventById} from "../services/event-service.js";
import {createUser, deleteUserByUserId, getUserById, updateUserByUserId} from "../services/user-service.js";
import {adminFunction, initDb, tempCreateTickets} from "../utils/db-connect.js";
import {loginUser} from "../services/login-service.js";
import {createTicket, deleteTicketById, getAllTickets, getTicketsForEvent} from "../services/ticket-service.js";

// how to do routing? these only call service functions

const router = express.Router();

router.route('/admin')
    .get(tempCreateTickets);

router.route('/allEvents')
    .post(createIsuFootball);

router.route('/events')
    .get(getAllEvents)
    .post(createEvent);

router.route('/events/:eventDate')
    .get(getEventByDate);

router.route('/events/:eventId')
    .get(getEventById);

router.route('/users')
    .post(createUser);

router.route('/tickets')
    .get(getAllTickets);

router.route('/tickets/:eventId')
    .get(getTicketsForEvent);

router.route('/createTicket')
    .post(createTicket);

router.route('/deleteTicket/:ticketId')
    .delete(deleteTicketById);

router.route('/login')
    .post(loginUser);

router.route('/users/:userId')
    .get(getUserById)
    .put(updateUserByUserId)
    .delete(deleteUserByUserId);


export default router;