export interface IUserEvent {
    date: Date;
    attended: boolean;
    type: string;
}

export interface IUser {
    _id?: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    telephone: string;
    address: string;
    city: string;
    zipCode: string;
    roles: string[];
    birthDate: string;
    events: IUserEvent[];
}
