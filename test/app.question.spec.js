const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)


//testing the get route of the question don't know how it will work

describe('/get book',(done)=>{
    chai.request(app).get('/users/question').end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
    })
})