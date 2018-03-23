import * as express from 'express';
import * as jwt from 'express-jwt';

import { create, findAll, findById, remove, update } from '../controller/user.controller';
import { IUser } from '../model/UserModel';
import { asyncRouteHandler } from './asyncRouteHandler';

/**
 * Rest endpoints
 */

export function getRoutes(auth: jwt.RequestHandler): express.Router {
    const router: express.Router = express.Router();

    router.get('/', auth, asyncRouteHandler(
        async (req: express.Request, res: express.Response): Promise<void> => {
            const users: IUser[] = await findAll();

            res.json({
                data: users,
                message: 'get all users',
                status: 200
            });
        })
    );

    router.get('/:id', auth, asyncRouteHandler(
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

    router.post('/', auth, asyncRouteHandler(
        async (req: express.Request, res: express.Response): Promise<void> => {
            const user: IUser = await create(req.body);

            res.json({
                data: user,
                message: `user created ${user.id}`,
                status: 200
            });
        })
    );

    router.put('/:id', auth, asyncRouteHandler(
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

    router.delete('/:id', auth, asyncRouteHandler(
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
        res.status(404);
        res.json({
            message: 'not found',
            status: 404
        });
    });

    // tslint:disable-next-line no-any
    router.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
        if (err.name === 'UnauthorizedError') {
            res.status(401);
            res.json({
                message: err,
                status: 401
            });
        } else {
            res.status(500);
            res.json({
                message: err,
                status: 500
            });
        }
    });

    return router;
}
