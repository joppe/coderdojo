import * as express from 'express';
import { create, findAll, findById, remove, update } from '../controller/event.controller';
import { IEvent } from '../model/EventModel';
import { asyncRouteHandler } from './asyncRouteHandler';

/**
 * Rest endpoints
 */

const router: express.Router = express.Router();

router.get('/event', asyncRouteHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        const events: IEvent[] = await findAll();

        res.json({
            data: events,
            message: 'get all events',
            status: 200
        });
    })
);

router.get('/event/:id', asyncRouteHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        const id: string = req.params.id;
        const event: IEvent = await findById(id);

        res.json({
            data: event,
            message: `get event with id ${id}`,
            status: 200
        });
    })
);

router.post('/event', asyncRouteHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        const event: IEvent = await create({
            type: 'dojo'
        });

        res.json({
            data: event,
            message: `event created ${event.id}`,
            status: 200
        });
    })
);

router.put('/event/:id', asyncRouteHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        const id: string = req.params.id;
        const event: IEvent = await update(id, req.body);

        res.json({
            data: event,
            message: `update event with id ${id}`,
            status: 200
        });
    })
);

router.delete('/event/:id', asyncRouteHandler(
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        const id: string = req.params.id;

        await remove(id);

        res.json({
            message: `delete event with id ${id}`,
            status: 200
        });
    })
);

router.use((req: express.Request, res: express.Response): void => {
    res.json({
        message: 'not found',
        status: 404
    });
});

// tslint:disable-next-line no-any
router.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
    res.json({
        message: err,
        status: 500
    });
});

export { router };
