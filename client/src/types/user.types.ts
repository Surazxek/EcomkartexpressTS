
export default interface IUser {
    _id: string
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    role: Role ;
    createdAt: string;
    updatedAt : string

}


export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}