import {findUserById, saveUser} from "../repostitories/user-repository.js";
import bcrypt from "bcrypt";

export const getUserById = async (req, res) => {

    const user = await findUserById(req.params.userId);

    return res.json(user);
}

const saltRounds = 10;

// no map needed
// should User be an object somewhere?
export const createUser = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: 'Error: Email and Password are required.'
        });
    }

    try {
        // hash password
        const hashed = await bcrypt.hash(req.body.password, saltRounds);

        console.log('inserting hashed: '+hashed);

        const toSave = {
            email: req.body.email,
            password: hashed
        };

        const user = await saveUser(toSave);

        return res.json(user.email);
    } catch (err) {
        console.log(err);
    }
}

export const updateUserByUserId = async (req, res) => {


}

export const deleteUserByUserId = async (req, res) => {

}