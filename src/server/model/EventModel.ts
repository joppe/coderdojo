import * as mongoose from 'mongoose';
import { EventSchema } from '../schema/EventSchema';

/**
 * Event model
 */

export interface IEvent extends mongoose.Document {
    type: string;
    date: Date;
}

export const EventModel: mongoose.Model<IEvent> = mongoose.model<IEvent>('Event', EventSchema);
