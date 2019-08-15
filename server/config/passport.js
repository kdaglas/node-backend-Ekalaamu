import passport from 'passport';
import GooglePlusTokenStrategy from 'passport-google-plus-token';
import FacebookTokenStrategy from 'passport-facebook-token';
import TwitterTokenStrategy from 'passport-twitter-token';
import { Strategy as LinkedInTokenStrategy } from 'passport-linkedin-oauth2';
import dotenv from 'dotenv';

dotenv.config();

// Google Oauth strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
}, async (accessToken, refreshToken, profile, done) => {
    done(null, profile);
}));

// Facebook Oauth strategy
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: process.env.facebookClientID,
    clientSecret: process.env.facebookClientSecret,
}, async (accessToken, refreshToken, profile, done) => {
    done(null, profile);
}));

// twitter Oauth strategy
passport.use('twitterToken', new TwitterTokenStrategy({
    consumerKey: process.env.twitterClientID,
    consumerSecret: process.env.twitterClientSecret,
}, (accessToken, refreshToken, profile, done) => {
    done(null, profile);
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

export { passport }
