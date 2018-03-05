import * as mongoose from 'mongoose';

/**
 * Event model
 */

export interface IEvent extends mongoose.Document {
    type: string;
    date: Date;
}

export const EventSchema: mongoose.Schema = new mongoose.Schema({
    type: {
        enum: ['dojo', 'content', 'social'],
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const EventModel: mongoose.Model<IEvent> = mongoose.model<IEvent>('Event', EventSchema);
