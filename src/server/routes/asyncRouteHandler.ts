import * as express from 'express';

/**
 * Wrapper function for async router handler functions.
 */

export type AsyncRouterHandler = (handler: express.RequestHandler) => express.RequestHandler;

export const asyncRouteHandler: AsyncRouterHandler = (handler: express.RequestHandler): express.RequestHandler => {
    return (req: express.Request, res: express.Response, next: express.NextFunction): void => {
        Promise
            .resolve(handler(req, res, next))
            .catch(next);
    };
};
