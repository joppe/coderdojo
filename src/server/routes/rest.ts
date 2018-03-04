import * as express from 'express';

/**
 * Rest endpoints
 */

const router: express.Router = express.Router();

router.get('/event', (req: express.Request, res: express.Response): void => {
    res.json({
        data: [],
        message: 'get all events',
        status: 200
    });
});

router.get('/event/:id', (req: express.Request, res: express.Response): void => {
    res.json({
        data: [],
        message: `get event with id ${req.params.id}`,
        status: 200
    });
});

router.post('/event', (req: express.Request, res: express.Response): void => {
    res.json({
        data: [],
        message: 'create new event',
        status: 200
    });
});

router.put('/event/:id', (req: express.Request, res: express.Response): void => {
    res.json({
        data: [],
        message: `update event with id ${req.params.id}`,
        status: 200
    });
});

router.delete('/event/:id', (req: express.Request, res: express.Response): void => {
    res.json({
        data: [],
        message: `delete event with id ${req.params.id}`,
        status: 200
    });
});

router.use((req: express.Request, res: express.Response): void => {
    res.json({
        data: [],
        message: 'not found',
        status: 404
    });
});

export { router };
