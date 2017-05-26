let user = require('../models/User');
let product = require('../models/Product');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Product', () => {
      before((done) => { //Before each test we empty the database
          product.remove({}, (err) => {
             done();
          });
      });
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
      let token;
      describe('/POST login', () => {
          let newuser = new user({"userEmail":"archit@grr.la","password":"123456"});
          it('it should log in user', (done) => {
            chai.request(server)
                .post('/users/login')
                .send(newuser)
                .end((err, res) => {
                    token = res.body;
                    res.should.have.status(200);
                    res.body.should.be.a('string');
                  done();
                });
          });
      });
      /* Testing adding product with correct data */
      describe('/POST addProduct', () => {
           let newProduct = new product({"code":1,"name":"Blah","price":"100"});
           it('it should add new product', (done) => {
             chai.request(server)
                 .post('/api/v1/product')
                 .send(newProduct)
                 .set('cookie',['token=' + token])
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                   done();
                 });
           });
      });
      /* Testing adding product with incorrect data */
      describe('/POST addProduct', () => {
            let newProduct = new product({"code":1,"name":"Blah"});
            it('it should add new product', (done) => {
              chai.request(server)
                  .post('/api/v1/product')
                  .send(newProduct)
                  .set('cookie',['token=' + token])
                  .end((err, res) => {
                      res.should.have.status(400);
                      res.body.should.be.a('object');
                    done();
                  });
            });
      });
      /* Testing view product with correct data */
      describe('/POST viewProduct', () => {
            it('it should view product', (done) => {
              chai.request(server)
                  .get('/api/v1/product?code=1')
                  .set('cookie',['token=' + token])
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                    done();
                  });
            });
      });
      /* Testing view product with incorrect data */
      describe('/POST viewProduct', () => {
            it('it should view product', (done) => {
              chai.request(server)
                  .get('/api/v1/product?code=3')
                  .set('cookie',['token=' + token])
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                    done();
                  });
            });
      });
      /* Testing view all product with correct data */
      describe('/POST viewAllProducts', () => {
            it('it should view product', (done) => {
              chai.request(server)
                  .get('/api/v1/viewAllProducts')
                  .set('cookie',['token=' + token])
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.data.should.be.a('array');
                    done();
                  });
            });
      });
      /* Testing deleting product with correct data */
      describe('/DELETE deleteProduct', () => {
              let newProduct = new product({"code":"1"});
              it('it should edit product', (done) => {
                chai.request(server)
                    .delete('/api/v1/product')
                    .send(newProduct)
                    .set('cookie',['token=' + token])
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                      done();
                    });
              });
      });
      /* Testing deleting product with incorrect data */
       describe('/DELETE deleteProduct', () => {
           let newProduct = new product({"code":"2"});
           it('it should edit product', (done) => {
             chai.request(server)
                 .delete('/api/v1/product')
                 .send(newProduct)
                 .set('cookie',['token=' + token])
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                   done();
                 });
           });
       });
     after((done) => { //After each test we empty the database
         user.remove({},(err) => {
         });
         product.remove({}, (err) => {
           done();
         });
     });
});
