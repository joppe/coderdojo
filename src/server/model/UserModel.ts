import * as mongoose from 'mongoose';

/**
 * Event model
 */

export interface IUserEvent {
    date: Date;
    attended: boolean;
    type: string;
}

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    telephone: string;
    address: string;
    city: string;
    roles: string[];
    birthDate: Date;
    events: IUserEvent[];
}

export const UserSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
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
    ]
});

export const UserModel: mongoose.Model<IUser> = mongoose.model<IUser>('User', UserSchema);
