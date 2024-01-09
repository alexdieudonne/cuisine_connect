import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import IUser from '@/types/user';
import UserSchema from '@/models/User';

passport.serializeUser((user, done) => {
  done(null,);
});

passport.deserializeUser((e, done) => {

});

var opts = {} as any
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
  UserSchema.findOne<IUser>({ id: jwt_payload.sub }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  });
}));

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserSchema.create({ email, password: email });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;