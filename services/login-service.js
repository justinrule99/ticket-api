import {findUserByUsernameAndHashedPassword, getHashedPassword} from "../repostitories/user-repository.js";
import bcrypt from 'bcrypt';

// client sends plaintext password (over https), hashing happens on server side
// how should auth and session management work??

// for /login only: also includes util functions for password hashing, etc

const sendError = (res, statusCode, message) => {
    return res.status(statusCode).send({
        message: message
    });
}

// post, hashes pw, checks db, sends jwt
// client sends cleartext username and password
export const loginUser = async (req, res) => {
    console.log(req.body);

    if (!req.body.email || !req.body.password) {
        return sendError(res, 400, 'Error: Email and Password are required');
    }

    // get hashed password from db for username
    let previousHashed;
    try {
        previousHashed = await getHashedPassword(req.body.email);
        if (previousHashed.length === 0) {
            console.log('empty array..');

            return sendError(res, 403,'Error: User does not exist');
        }


    } catch (e) {
        console.log(e);
        return sendError(res, 403,'Error: Username mismatch');
    }

    console.log('prev hashed:');
    console.log(JSON.stringify(previousHashed, null, 2));

    const matches = await bcrypt.compare(req.body.password, previousHashed[0].password);

    console.log('matches? '+matches);

    let user;

    if (matches) {
        user = await findUserByUsernameAndHashedPassword(req.body.email, previousHashed[0].password);
    } else {
        console.log('about to send error, password dindt match');
        return res.status(403).send({
            message: 'Error: Wrong Password'
        });
    }

    if (!user || user.length === 0) {
        return res.status(403).send({
            message: 'Error: Wrong email or password'
        });
    }

    // dont send the user, just the jwt object
    return res.json(user);
}