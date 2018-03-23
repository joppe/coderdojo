import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';

import { TOKEN_EXPIRATION_DAYS, TOKEN_SECRET } from '../config/vars';

/**
 * User model
 */

export interface IUserEvent {
    date: Date;
    attended: boolean;
    type: string;
}

export interface IUser extends mongoose.Document {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    telephone: string;
    address: string;
    city: string;
    zipCode: string;
    roles: string[];
    birthDate: Date;
    events: IUserEvent[];
    salt: string;
    hash: string;

    setPassword(password: string): void;
    isValidPassword(password: string): boolean;
    generateJwt(): string;
}

export const UserSchema: mongoose.Schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    zipCode: {
        type: String,
        required: false
    },
    roles: {
        type: [String],
        required: true
    },
    birthDate: {
        type: Date,
        required: false
    },
    events: [
        {
            date: {
                type: Date,
                required: true
            },
            attended: {
                type: Boolean,
                required: true
            },
            type: {
                type: String,
                required: true
            }
        }
    ],
    hash: String,
    salt: String
});

UserSchema.methods.setPassword = function (this: IUser, password: string): void {
    // tslint:disable-next-line no-invalid-this
    this.salt = crypto.randomBytes(16).toString('hex');

    // tslint:disable-next-line no-invalid-this
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.isValidPassword = function (this: IUser, password: string): boolean {
    const generatedHash: string = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

    return this.hash === generatedHash;
};

UserSchema.methods.generateJwt = function (this: IUser): string {
    const expiry: Date = new Date();

    expiry.setDate(expiry.getDate() + TOKEN_EXPIRATION_DAYS);

    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            firstName: this.firstName,
            exp: Math.round(expiry.getTime() / 1000)
        },
        TOKEN_SECRET
    );
};

export const UserModel: mongoose.Model<IUser> = mongoose.model<IUser>('User', UserSchema);
