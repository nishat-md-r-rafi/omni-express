export interface Address{
    city: string;
    zipCode: Number;
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    address: Address[];
    roles: string;
    avatar: string;
    resetPasswordToken: string;
    resetPasswordTime: Date;
}  

