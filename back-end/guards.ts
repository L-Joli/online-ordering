import * as passport from 'passport';
import { Request, Response, NextFunction } from 'express';

export const isLoggedIn = passport.authenticate('jwt', { session: false });

export const adminLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.user);
    if (req.user && req.user['role'] === 'admin') {
        next();
        return;
    }
    res.status(401).json({ message: 'Unauthorized' });
}