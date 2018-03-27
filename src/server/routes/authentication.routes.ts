import * as express from 'express';

import { authenticate } from '../controller/user.controller';
import { IUser } from '../model/UserModel';

const router: express.Router = express.Router();

router.post('/login', (req: express.Request, res: express.Response): void => {
    authenticate(req.body.email, req.body.password).then((user: IUser | undefined): void => {
        if (user) {
            res.send(user);
        } else {
            res.status(400);
            res.send('Username or password is incorrect');
        }
    // tslint:disable-next-line no-any
    }).catch((err: any): void => {
        res.status(400);
        res.send(err);
    });
});

export { router };
