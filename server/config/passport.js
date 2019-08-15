import passport from 'passport';
import GooglePlusTokenStrategy from 'passport-google-plus-token';
import FacebookTokenStrategy from 'passport-facebook-token';
import TwitterTokenStrategy from 'passport-twitter-token';
import { Strategy as LinkedInTokenStrategy } from 'passport-linkedin-oauth2';
import dotenv from 'dotenv';
import { User } from "../models/user";
import {Actions} from "../helpers/actions";

dotenv.config();

// Google Oauth strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
}, async (accessToken, refreshToken, profile, done) => {
    await newSocialAccount(profile, done);
}));

// Facebook Oauth strategy
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: process.env.facebookClientID,
    clientSecret: process.env.facebookClientSecret,
}, async (accessToken, refreshToken, profile, done) => {
    await newSocialAccount(profile, done);
}));

// twitter Oauth strategy
passport.use('twitterToken', new TwitterTokenStrategy({
    consumerKey: process.env.twitterClientID,
    consumerSecret: process.env.twitterClientSecret,
}, async (accessToken, refreshToken, profile, done) => {
    await newSocialAccount(profile, done);
}));

// LinkedIn Oauth strategy
passport.use('linkedInToken', new LinkedInTokenStrategy({
    clientID: process.env.linkedInClientID,
    clientSecret: process.env.linkedInClientSecret,
    callbackURL: "http://localhost:4200/auth/callback",
    scope: ['r_emailaddress', 'r_basicprofile']
}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    done(null, profile);
}));

const newSocialAccount = async (profile, done) => {
    try {
        const existingUser = await User.findOne({
            where: {
                id: profile.id,
                strategy: profile.provider
            }
        });
        if (existingUser) {
            return done(null, existingUser);
        }
        const newUserAccount = await userData(profile);

        done(null, newUserAccount);

    }catch (e) {
        done(e, false, e.message);
    }
};

const userData = (profile) => {
    if (profile.provider === 'twitter')  {
        const name = profile.displayName.split(" ");
        profile.name.givenName = name[0];
        profile.name.familyName = name[1];
    }
    const data = {
        id: profile.id,
        firstName: profile.name.familyName,
        lastName: profile.name.givenName,
        email: profile.emails[0].value,
        verified: true,
        strategy: profile.provider
    };
    return Actions.addData(User, data, [
        "id",
        "firstName",
        "lastName",
        "email",
        "strategy",
        "verified",
        "password"
    ]);

};

export { passport }
