import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import { connect } from  './db';
import { router as restRoutes } from './routes/rest';

/**
 * Server
 */
connect({
    host: 'localhost',
    port: '27017',
    name: 'coderdojo'
}).then((): void => {
    const app: express.Application = express();

    // Parsers
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    // frontend code folder
    app.use(express.static(path.join(__dirname, 'dist/client')));

    app.use('/api', restRoutes);

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
