import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from "chai-http";
// import {passport} from "../server/config/passport";
import passport from 'passport';
import {googleData} from "./helpers/mock-data";
// import app from "../server/express";
// import {googleData} from "./helpers/mock-data";

const expect = chai.expect;
chai.use(chaiHttp);

// function greaterThanTwenty(num) {
//     if (num > 20) return true;
//     return false;
// }
//
// describe('Sample Sinon Stub', () => {
//     it('should pass', (done) => {
//         const greaterThanTwenty = sinon.stub().returns('something');
//         expect(greaterThanTwenty(0)).to.be.equal('something');
//         expect(greaterThanTwenty(0)).to.not.be.equal(false);
//         // greaterThanTwenty(0).should.eql('something');
//         // greaterThanTwenty(0).should.not.eql(false);
//         done();
//     });
// });

describe('Social auth', () => {
    let sandbox;
    let authenticate;
    let app;

    beforeEach((done) => {
        sandbox = sinon.createSandbox();
        authenticate = sandbox.stub(passport, 'authenticate').callsFake((strategy, options) => {
            // callback(null, {"username": "katunold"}, null);
            return (req, res, next) => {};
        });
        // authenticate.yields(null, { id: 1 });

        app = require("../server").app;
        done();
    });

    afterEach(() => {
        authenticate.restore();
    });

    it('should return google user data', function (done) {
        chai.request(app)
          .post('/api/v1/google')
          .end((err, res) => {
              console.log(err);
              console.log(res.text);
              done()
          });
    });

});
