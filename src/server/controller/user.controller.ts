import { IUser, UserModel } from '../model/UserModel';

/**
 * Handle user CRUD
 */

const PASSWORD_FIELD: string = 'passowrd';

const USER_FIELDS: string[] = [
    'firstName',
    'middleName',
    'lastName',
    'email',
    'telephone',
    'address',
    'city',
    'zipCode',
    'birthDate'
];

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
        UserModel.findById(id, (err: any, user: IUser): void => {
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

export function updatePassword(id: string, password: string): Promise<IUser> {
    return new Promise((resolve: Function, reject: Function): void => {
        // tslint:disable-next-line no-any
        UserModel.findById(id, (findErr: any, user: IUser): void => {
            if (findErr) {
                reject(findErr);
            } else {
                user.setPassword(password);

                // tslint:disable-next-line no-any
                user.save((saveErr: any) => {
                    if (findErr) {
                        reject(saveErr);
                    } else {
                        resolve(user);
                    }
                });
            }
        });
    });
}

export function create(data: Partial<IUser>): Promise<IUser> {
    return new Promise((resolve: Function, reject: Function): void => {
        const user: IUser = new UserModel();

        USER_FIELDS.forEach((field: string): void => {
            user[field] = data[field];
        });

        user.setPassword(data[PASSWORD_FIELD]);

        // tslint:disable-next-line no-any
        user.save((err: any) => {
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
