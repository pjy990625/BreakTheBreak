import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import passport from 'passport';
import User from "./mongodb/models/user.js";

const GOOGLE_CLIENT_ID = "47440555039-cohitv7bhjco2tle3r3ftqjr099al3u5.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GITHUB_CLIENT_ID = "75998784fb102112336f";
const GITHUB_CLIENT_SECRET = "3c2633c5782731b1bf6e6474a4f507e00795455d";

// check if user exists in database
async function checkUser(profile, done) {
    const userId = profile.id;

    try {
        const existingUser = await User.findOne({ id: userId });

        if (existingUser) {
            console.log('Welcome back!');
            done(null, profile);
        } else {
            const newUser = new User({ id: userId });
            await newUser.save();
            console.log('New user added to database.');
            done(null, profile);
        }
    } catch (err) {
        console.log(err);
        done(err);
    }
}

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
}, function (accessToken, refreshToken, profile, done) {
    checkUser(profile, done);
}));

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
}, function (accessToken, refreshToken, profile, done) {
    checkUser(profile, done);
}));

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser((user, done) => {
    done(null, user)
});

export default passport;