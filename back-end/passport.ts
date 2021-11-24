import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';
import jwt from './jwt';
import { UserService } from './services/UserService';
// import { userService } from './main';

const JWTStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

export function initializePassport(userService: UserService) {
    passport.use(new JWTStrategy({
    secretOrKey: jwt.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async ( payload, done) => {
    const user = await userService.getUserById(payload.id);
    if (user) {

        return done(null, user);
    } else {
        return done(new Error("User not Found"), null);
    }
})
);
}

