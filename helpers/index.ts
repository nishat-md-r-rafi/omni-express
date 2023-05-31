import crypto from 'crypto';

export const random = () => crypto.randomBytes(128).toString('base64')

const secret = "mySecret"

export const authentication = (salt: string, password:string) => { 
    return crypto.createHmac('sha256', [salt, password].join("/")).update(secret).digest("hex")    
}