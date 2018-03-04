import { EventModel, IEvent } from '../model/EventModel';

/**
 * Handle event CRUD
 */

export function findAll(): Promise<IEvent[]> {
    return new Promise((resolve: Function, reject: Function): void => {
        EventModel.find({}, (err: any, events: IEvent[]): void => {
            if (err) {
                reject(err);
            } else {
                resolve(events);
            }
        });
    });
}

export function findById(): void {

}

export function update(): void {
}

export function create(): Promise<IEvent> {
    return new Promise((resolve: Function, reject: Function): void => {
        const doc: IEvent = new EventModel({
            type: 'dojo',
            date: Date.now()
        });

        doc.save((err: any, event: IEvent): void => {
            if (err) {
                reject(err);
            } else {
                resolve(event);
            }
        });
    });
}

export function remove(): void {

}
