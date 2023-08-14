const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const app = require("../app");

const should = chai.should();

chai.use(chaiHttp);

// describe("queston api", () => {
//     it("getting all the quesiton  ", (done) => {
        
//         chai.request(app).get("/users/question").end((err, response) => {
//             response.should.have.status(200);
//             response.body.should.be.a("Object");
//             done();
//         });
//     });
// });



describe("queston api", () => {
    it("signUp testing of the user  ", (done) => {
        const user = {
            "firstName": "jamm",
            "lastName": "patel",
            "emailId": "vivekyadav11111111@gmail.com",
            "password": "Abc@123",
            "confirmPassword": "Abc@123"
        }
        chai.request(app).post("/signup").send(user).end((err, response) => {
            console.log('======',response.body.errors)
            response.should.have.status(201);
            response.body.should.have.property("message");
            response.body.should.have.property("data");
            done();
        });
    });
});
