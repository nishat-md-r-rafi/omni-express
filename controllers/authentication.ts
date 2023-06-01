import express from 'express';
import { createUser, getUserByEmail } from '../models/User';
import { authentication, random } from '../helpers';


export const login = async (req: express.Request, res:express.Response) => {  
    const {email, password} = req.body;

    // check information is missing or not
    if(!email || !password) {
        return res.status(400).json("information is missing!");
    }

    // check user
    const user = await getUserByEmail(email).select("+authentication.salt +authentication.password")

    if (!user) {
      return res.status(404).json("user not found!");
    }


}

export const register = async (req: express.Request, res: express.Response) => {  
    try {
        const {email, password, name} = req.body;
        // console.log({email, password, name}, "from register")
        if (!email || !password || !name) {
          return res.status(400).json("information is missing!")
        }

        else{
            const existingUser = await getUserByEmail(email)
            // console.log(existingUser)

            if (existingUser.length !> 0) {
                return res.status(400).json("user already exists");
            }
            else{
                const salt = random()
                const user = await createUser({
                    email,
                    name,
                    authentication:{
                        salt,
                        password: authentication(salt, password),
                    }
                });

                return res.status(200).json("user created successfully")
            }
        }
    } catch (error) {
        console.log(error)
        return res.sendStatus(400);
    }
}