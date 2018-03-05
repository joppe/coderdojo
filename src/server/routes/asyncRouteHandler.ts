import * as express from 'express';

/**
 * Wrapper function for async router handler functions.
 */

export interface IAsyncRouterHandler {
    (handler: express.RequestHandler): express.RequestHandler;
}

export const asyncRouteHandler: IAsyncRouterHandler = (handler: express.RequestHandler): express.RequestHandler => {
    return (req: express.Request, res: express.Response, next: express.NextFunction): void => {
        Promise
            .resolve(handler(req, res, next))
            .catch(next);
    };
};
