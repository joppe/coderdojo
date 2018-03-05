import { IUser, UserModel } from '../model/UserModel';

/**
 * Handle user CRUD
 */

export function findAll(): Promise<IUser[]> {
    return new Promise((resolve: Function, reject: Function): void => {
        // tslint:disable-next-line no-any
        UserModel.find({}, (err: any, users: IUser[]): void => {
            if (err) {
                reject(err);
            } else {
                resolve(users);
            }
        });
    });
}

export function findById(id: string): Promise<IUser> {
    return new Promise((resolve: Function, reject: Function): void => {
        // tslint:disable-next-line no-any
        UserModel.findById(id, (err: any, user: IUser) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
}

export function update(id: string, data: Partial<IUser>): Promise<IUser> {
    return new Promise((resolve: Function, reject: Function): void => {
        // tslint:disable-next-line no-any
        UserModel.findByIdAndUpdate(id, data, {new: true}, (err: any, user: IUser): void => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
}

export function create(data: Partial<IUser>): Promise<IUser> {
    return new Promise((resolve: Function, reject: Function): void => {
        // tslint:disable-next-line no-any
        UserModel.create(data, (err: any, user: IUser): void => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
}

export function remove(id: string): Promise<void> {
    return new Promise((resolve: Function, reject: Function): void => {
        // tslint:disable-next-line no-any
        UserModel.findByIdAndRemove(id, (err: any): void => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
