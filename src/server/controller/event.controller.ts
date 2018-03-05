import { EventModel, IEvent } from '../model/EventModel';

/**
 * Handle event CRUD
 */

export function findAll(): Promise<IEvent[]> {
    return new Promise((resolve: Function, reject: Function): void => {
        // tslint:disable-next-line no-any
        EventModel.find({}, (err: any, events: IEvent[]): void => {
            if (err) {
                reject(err);
            } else {
                resolve(events);
            }
        });
    });
}

export function findById(id: string): Promise<IEvent> {
    return new Promise((resolve: Function, reject: Function): void => {
        // tslint:disable-next-line no-any
        EventModel.findById(id, (err: any, event: IEvent) => {
            if (err) {
                reject(err);
            } else {
                resolve(event);
            }
        });
    });
}

export function update(id: string, data: Partial<IEvent>): Promise<IEvent> {
    return new Promise((resolve: Function, reject: Function): void => {
        // tslint:disable-next-line no-any
        EventModel.findByIdAndUpdate(id, data, {new: true}, (err: any, event: IEvent): void => {
            if (err) {
                reject(err);
            } else {
                resolve(event);
            }
        });
    });
}

export function create(data: Partial<IEvent>): Promise<IEvent> {
    return new Promise((resolve: Function, reject: Function): void => {
        // tslint:disable-next-line no-any
        EventModel.create({date: Date.now(), ...data}, (err: any, event: IEvent): void => {
            if (err) {
                reject(err);
            } else {
                resolve(event);
            }
        });
    });
}

export function remove(id: string): Promise<void> {
    return new Promise((resolve: Function, reject: Function): void => {
        // tslint:disable-next-line no-any
        EventModel.findByIdAndRemove(id, (err: any): void => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
