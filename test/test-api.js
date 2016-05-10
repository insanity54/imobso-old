var assert = require('chai').assert;
var api = require('../api');
var request = require('supertest');
var app = require('../index');


describe('API', function() {
  // describe('Unit', function() {
  //   describe('setup middleware', function() {
  //     it('should create req._imobso', function() {
  //
  //     });
  //   });
  // });

  describe('Integration', function() {
    describe('GET /api/v1/online', function() {
      it('should return 200 for a valid GUID', function(done) {
        request(app)
            .get('/api/v1/online/a06aa22a38f0e62221ab74464c311bd88305f88c')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
              //assert.isDefined(res)
              console.log(res.body);
              assert.isDefined(res.body);
            })
            .expect(200, done);
        });



      it('should return 400 for an invalid GUID', function(done) {
        request(app)
            .get('/api/v1/online/a06aa22a38f0e62221ab74464c311bd88305')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
              console.log(res.body);
              assert.isDefined(res.body);
            })
            .expect(400, done);
        });

    });
  });
});
