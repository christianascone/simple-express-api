var supertest = require("supertest");
var should = require("chai").should();

var app = require("../app/simple-express.js");
var server = supertest.agent("http://localhost:3000");

describe("Test GET /users", function() {

  it("should return a list of 10 users (default size)", function(done) {
    server.get("/api/users")
    .expect("Content-type", /json/)
    .expect(200)
    .end(function(err, res) {
      res.status.should.equal(200);
      res.body.success.should.equal(1);
      res.body.data.length.should.equal(10);
      done();
    });
  });

  it("should return a list of 5 users (passed parameter)", function(done) {
    server.get("/api/users")
    .query({
      size: 5
    })
    .expect("Content-type", /json/)
    .expect(200)
    .end(function(err, res) {
      res.status.should.equal(200);
      res.body.success.should.equal(1);
      res.body.data.length.should.equal(5);
      done();
    });
  });
});

describe("Test POST /users", function() {

  it("should return a user with same data passed as parameters", function(done) {
    server.post("/api/user")
    .send({
      first_name: "Name",
      last_name: "Not Name"
    })
    .expect("Content-type", /json/)
    .expect(200)
    .end(function(err, res) {
      res.status.should.equal(200);
      res.body.success.should.equal(1);
      res.body.data.first_name.should.equal("Name");
      res.body.data.last_name.should.equal("Not Name");
      done();
    });
  });

  it("should return an empty user", function(done) {
    server.post("/api/user")
    .expect("Content-type", /json/)
    .expect(200)
    .end(function(err, res) {
      res.status.should.equal(200);
      res.body.success.should.equal(1);
      res.body.data.should.be.empty;
      done();
    });
  });
});

describe("Test PUT /users", function() {

  it("should return a user with same data passed as parameters and user id passed in route", function(done) {
    var userId = "4";
    server.put("/api/user/" + userId)
    .send({
      first_name: "Name",
      last_name: "Not Name"
    })
    .expect("Content-type", /json/)
    .expect(200)
    .end(function(err, res) {
      res.status.should.equal(200);
      res.body.success.should.equal(1);
      res.body.data.userId.should.equal(userId);
      res.body.data.first_name.should.equal("Name");
      res.body.data.last_name.should.equal("Not Name");
      done();
    });
  });
});