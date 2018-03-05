import * as express from 'express';
import { create, findAll, findById, remove, update } from '../controller/user.controller';
import { IUser } from '../model/UserModel';
import { asyncRouteHandler } from './asyncRouteHandler';

/**
 * Rest endpoints
 */

const router: express.Router = express.Router();

router.get('/', asyncRouteHandler(
    async (req: express.Request, res: express.Response): Promise<void> => {
        const users: IUser[] = await findAll();

        res.json({
            data: users,
            message: 'get all users',
            status: 200
        });
    })
);

router.get('/:id', asyncRouteHandler(
    async (req: express.Request, res: express.Response): Promise<void> => {
        const id: string = req.params.id;
        const user: IUser = await findById(id);

        res.json({
            data: user,
            message: `get user with id ${id}`,
            status: 200
        });
    })
);

router.post('/', asyncRouteHandler(
    async (req: express.Request, res: express.Response): Promise<void> => {
        const user: IUser = await create(req.body);

        res.json({
            data: user,
            message: `user created ${user.id}`,
            status: 200
        });
    })
);

router.put('/:id', asyncRouteHandler(
    async (req: express.Request, res: express.Response): Promise<void> => {
        const id: string = req.params.id;
        const user: IUser = await update(id, req.body);

        res.json({
            data: user,
            message: `update user with id ${id}`,
            status: 200
        });
    })
);

router.delete('/:id', asyncRouteHandler(
    async (req: express.Request, res: express.Response): Promise<void> => {
        const id: string = req.params.id;

        await remove(id);

        res.json({
            message: `delete user with id ${id}`,
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