import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as jwt from 'express-jwt';
import * as http from 'http';
import * as morgan from 'morgan';
import * as path from 'path';

import { TOKEN_SECRET } from './config/vars';
import { connect } from './db';
import { router as authenticationRoutes } from './routes/authentication.routes';
import { router as eventRoutes } from './routes/event.routes';
import { router as userRoutes } from './routes/user.routes';
import { EventModel, IEvent } from './model/EventModel';
import { IUser, UserModel } from './model/UserModel';

/**
 * Server
 */
connect({
    host: 'localhost',
    port: '27017',
    name: 'coderdojo'
}).then((): void => {
    const app: express.Application = express();

    app.use(morgan('dev'));

    // Parsers
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    // frontend code folder
    app.use(express.static(path.join(__dirname, 'dist/client')));

    app.use(jwt({
        secret: TOKEN_SECRET,
        getToken: (req: express.Request): string | null => {
            if (req.headers.authorization && (<string>req.headers.authorization).split(' ')[0] === 'Bearer') {
                return (<string>req.headers.authorization).split(' ')[1];
            } else if (req.query && req.query.token) {
                return req.query.token;
            }

            return null;
        }
    }).unless({
        path: [
            '/api/login'
        ]
    }));

    app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
        if (req.user) {
            UserModel.findById(req.user.sub, (err: any, user: IUser) => {
                if (err) {
                    // reject(err);
                } else {
                    req.user = user;
                    // resolve(event);
                }

                next();
            });
        } else {
            next();
        }
    });

    app.use('/api', authenticationRoutes);
    app.use('/api/event', eventRoutes);
    app.use('/api/user', userRoutes);

    // Send all other requests to the Angular app
    app.get('*', (req: express.Request, res: express.Response) => {
        res.sendFile(path.join(__dirname, 'dist/client/index.html'));
    });

    //Set Port
    const port: string = process.env.PORT || '3000';

    // tslint:disable-next-line no-backbone-get-set-outside-model
    app.set('port', port);

    const server: http.Server = http.createServer(app);

    server.listen(port, (): void => {
        // tslint:disable-next-line no-console
        console.log(`Running on localhost:${port}`);
    });
}).catch((): void => {
    console.error('Could not connect to database');
});
