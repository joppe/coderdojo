import * as mongodb from 'mongodb';
import * as mongoose from 'mongoose';

/**
 * Connect to the database
 */

export interface IConfig {
    host: string;
    port: string;
    name: string;
}

export async function connect(config: IConfig): Promise<{}> {
    return new Promise((resolve: Function , reject: Function): void => {
        mongoose.connect(`mongodb://${config.host}:${config.port}/${config.name}`);

        const db: mongoose.Connection = mongoose.connection;

        db.on('error', (err: mongodb.MongoError): void => {
            reject();
        });
        db.once('open', (): void => {
            resolve();
        });
    });
}
