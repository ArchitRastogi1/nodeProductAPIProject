let user = require('../models/User');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('User', () => {
    before((done) => { //Before each test we empty the database
        user.remove({}, (err) => {
           done();
        });
    });
  /* Testing for sign up with empty data */
  describe('/POST signup', () => {
      it('it should sign up user', (done) => {
        chai.request(server)
            .post('/users/signup')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
              done();
            });
      });
  });
  /* Testing  for sign up with correct data */
  describe('/POST signup', () => {
      let newuser = new user({"name":"Archit","userEmail":"archit@grr.la","password":"123456"});
      it('it should sign up user', (done) => {
        chai.request(server)
            .post('/users/signup')
            .send(newuser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
              done();
            });
      });
  });
 /* Testing login with correct data */
 describe('/POST login', () => {
     let newuser = new user({"userEmail":"archit@grr.la","password":"123456"});
     it('it should log in user', (done) => {
       chai.request(server)
           .post('/users/login')
           .send(newuser)
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('string');
             done();
           });
     });
 });
/* Testing login with incorrect data */
 describe('/POST login', () => {
     let newuser = new user({"userEmail":"archit@grr.la","password":"123457"});
     it('it should log in user', (done) => {
       chai.request(server)
           .post('/users/login')
           .send(newuser)
           .end((err, res) => {
               res.should.have.status(401);
               res.body.should.be.a('object');
             done();
           });
     });
 });

 after((done) => { //After each test we empty the database
     user.remove({}, (err) => {
        done();
     });
 });
});
