import * as express from 'express';
import * as passport from 'passport';
import { IUser } from '../model/UserModel';

const router: express.Router = express.Router();

router.get('/login', (req: express.Request, res: express.Response): void => {
    // tslint:disable-next-line no-any
    passport.authenticate('local', (err: any, user: IUser, info: any): void => {
        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);

            return;
        }

        // If a user is found
        if (user) {
            res.status(200);
            res.json({
                token: user.generateJwt()
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
});

export { router };
