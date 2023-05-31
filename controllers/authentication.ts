import express from 'express';
import { createUser, getUserByEmail } from '../models/User';
import { authentication, random } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {  
    try {
        const {email, password, name} = req.body;
        if (!email || !password || !name) {
          return res.sendStatus(400).json("information is missing!")
        }

        const existingUser = await getUserByEmail(email)

        if (existingUser) {
            return res.sendStatus(400).json("user exist!")
        }
        const salt = random()
        const user = await createUser({
            email,
            name,
            authentication:{
                salt,
                password: authentication(salt, password),
            }
        })

        res.json(user);
    } catch (error) {
        
    }
}