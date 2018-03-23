import * as passport from 'passport';
import { Strategy } from 'passport-local';

import { IUser, UserModel } from '../model/UserModel';

passport.use(
    new Strategy(
        {
            usernameField: 'email'
        },
        (username: string, password: string, done: Function): void => {
            UserModel.findOne(
                {
                        email: username
                },
                // tslint:disable-next-line no-any
                (err: any, user: IUser): boolean => {
                    if (err) {
                        return done(err);
                    }

                    // Return if user not found in database
                    if (!user) {
                        return done(null, false, {
                            message: 'User not found'
                        });
                    }
                    // Return if password is wrong
                    if (!user.isValidPassword(password)) {
                        return done(null, false, {
                            message: 'Password is wrong'
                        });
                    }

                    // If credentials are correct, return the user object
                    return done(null, user);
                }
            );
        }
    )
);
