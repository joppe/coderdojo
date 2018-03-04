import { Schema } from 'mongoose';

/**
 * Event schema
 */

export const EventSchema: Schema = new Schema({
    type: String,
    date: { type: Date, default: Date.now }
});
