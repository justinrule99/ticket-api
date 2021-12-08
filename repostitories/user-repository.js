import {getDBConnection} from "../utils/db-connect.js";

const knex = getDBConnection();

export const findUserById = (userId) => {
    return knex('users')
        .where({id: userId});
}

export const getHashedPassword = (email) => {
    return knex('users')
        .where({email});
}

export const findUserByUsernameAndHashedPassword = (email, hashedPassword) => {
    return knex('users')
        .where({email, password: hashedPassword});
}

export const saveUser = (user) => {
    // assume user is correct - handle errors in service
    // fields: email, password, venmo, phone
    return knex('users').insert(user);

}
