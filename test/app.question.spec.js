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


describe("api testing for signUp",()=>{

    describe("POST /signup", () => {
        // it("it should post new user data", (done) => {
        //     const user = {
        //         "firstName": "jamm",
        //         "lastName": "patel",
        //         "emailId": "vivekyadav12333@gmail.com",
        //         "password": "Abc@123",
        //         "confirmPassword": "Abc@123"
        //     }
        //     chai.request(app).post("/signup").send(user).end((err, response) => {
        //         response.should.have.status(201);
        //         response.body.should.have.property("message");
        //         response.body.should.have.property("data");
        //         console.log("=====",err)
        //         done();
        //     });
        // });
        it("it should not post the user with same email id ",(done)=>{
            const user={
                "firstName": "jamm",
                "lastName": "patel",
                "emailId": "vivekyadav12333@gmail.com",
                "password": "Abc@123",
                "confirmPassword": "Abc@123"
            }
            chai.request(app).post("/signup").send(user).end((err, response) => {
                response.should.have.status(401);
                response.body.should.have.property("message").eq("Email address already in use");
                
                done();
            
        })
    });
    it("it should not post without firstname ",(done)=>{
        const user={
            // "firstName": "jamm",
            "lastName": "patel",
            "emailId": "vivekyadav12333@gmail.com",
            "password": "Abc@123",
            "confirmPassword": "Abc@123"
        }
        chai.request(app).post("/signup").send(user).end((err, response) => {
            response.should.have.status(401);
            response.body.should.have.property("status").eq("failed")
            response.body.should.have.property("error").eq("firstname is required");
            
            done();
        
    })

    
});

it("it should not post without lastname ",(done)=>{
    const user={
        "firstName": "jamm",
        // "lastName": "patel",
        "emailId": "vivekyadav12333@gmail.com",
        "password": "Abc@123",
        "confirmPassword": "Abc@123"
    }
    chai.request(app).post("/signup").send(user).end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property("status").eq("failed")
        response.body.should.have.property("error").eq("lastName is required");
        
        done();
    
})


});
it("it should not post without email ",(done)=>{
    const user={
        "firstName": "jamm",
        "lastName": "patel",
        // "emailId": "vivekyadav12333@gmail.com",
        "password": "Abc@123",
        "confirmPassword": "Abc@123"
    }
    chai.request(app).post("/signup").send(user).end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property("status").eq("failed")
        response.body.should.have.property("error").eq("emailId is required");
        
        done();
    
})


});

it("it should not post without password ",(done)=>{
    const user={
        "firstName": "jamm",
        "lastName": "patel",
        "emailId": "vivekyadav12333@gmail.com",
        // "password": "Abc@123",
        "confirmPassword": "Abc@123"
    }
    chai.request(app).post("/signup").send(user).end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property("status").eq("failed")
        response.body.should.have.property("error").eq("password is required");
        
        done();
    
})


});

it("it should not post without confirm password ",(done)=>{
    const user={
        "firstName": "jamm",
        "lastName": "patel",
        "emailId": "vivekyadav12333@gmail.com",
        "password": "Abc@123",
        // "confirmPassword": "Abc@123"
    }
    chai.request(app).post("/signup").send(user).end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property("status").eq("failed")
        response.body.should.have.property("error").eq("confirmPassword is required");
        
        done();
    
})


});

it("it should not post with empty first name ",(done)=>{
    const user={
        "firstName": "",
        "lastName": "patel",
        "emailId": "vivekyadav12333@gmail.com",
        "password": "Abc@123",
        "confirmPassword": "Abc@123"
    }
    chai.request(app).post("/signup").send(user).end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property("status").eq("failed")
        response.body.should.have.property("error").eq("firstname can't be empty");
        
        done();
    
})


});


it("it should not post with empty last name ",(done)=>{
    const user={
        "firstName": "sudhir",
        "lastName": "",
        "emailId": "vivekyadav12333@gmail.com",
        "password": "Abc@123",
        "confirmPassword": "Abc@123"
    }
    chai.request(app).post("/signup").send(user).end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property("status").eq("failed")
        response.body.should.have.property("error").eq("lastName can't be empty");
        
        done();
    
})


});
it("it should not post with empty email ID ",(done)=>{
    const user={
        "firstName": "sudhir",
        "lastName": "chavda",
        "emailId": "",
        "password": "Abc@123",
        "confirmPassword": "Abc@123"
    }
    chai.request(app).post("/signup").send(user).end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property("status").eq("failed")
        response.body.should.have.property("error").eq("email can't be empty");
        
        done();
    
})


});

it("it should not post with empty password ",(done)=>{
    const user={
        "firstName": "sudhir",
        "lastName": "chavda",
        "emailId": "vivekyadav@gmail.com",
        "password": "",
        "confirmPassword": "Abc@123"
    }
    chai.request(app).post("/signup").send(user).end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property("status").eq("failed")
        response.body.should.have.property("error").eq("password can't be empty");
        
        done();
    
})


});
it("it should not post with empty confirm password",(done)=>{
    const user={
        "firstName": "sudhir",
        "lastName": "chavda",
        "emailId": "vivekyadav@gmail.com",
        "password": "Abc@123",
        "confirmPassword": ""
    }
    chai.request(app).post("/signup").send(user).end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property("status").eq("failed")
        response.body.should.have.property("error").eq("confirm password can't be empty");
        
        done();
    
})


});

it("it should not post without special characters and numbers",(done)=>{
    const user={
        "firstName": "sudhir",
        "lastName": "chavda",
        "emailId": "vivekyadav@gmail.com",
        "password": "Abc123",
        "confirmPassword": "Abc@123"
    }
    chai.request(app).post("/signup").send(user).end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property("status").eq("failed")
        response.body.should.have.property("error").eq("password must have one Uppercase One loweCase One number One special charater");
        
        done();
    
})


});
it("it should not post without having password atleast the length of 6",(done)=>{
    const user={
        "firstName": "sudhir",
        "lastName": "chavda",
        "emailId": "vivekyadav@gmail.com",
        "password": "Abc13",
        "confirmPassword": "Abc@123"
    }
    chai.request(app).post("/signup").send(user).end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property("status").eq("failed")
        response.body.should.have.property("error").eq("min length of password with 6 character");
        
        done();
    
})


});

it("it should not post without having valid email address",(done)=>{
    const user={
        "firstName": "sudhir",
        "lastName": "chavda",
        "emailId": "vivekyadav",
        "password": "Abc@213",
        "confirmPassword": "Abc@123"
    }
    chai.request(app).post("/signup").send(user).end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property("status").eq("failed")
        response.body.should.have.property("error").eq("enter your valid email");
        
        done();
    
})


});

it("it should not post without matching confirm password and password",(done)=>{
    const user={
        "firstName": "sudhir",
        "lastName": "chavda",
        "emailId": "vivekyadav@gmail.com",
        "password": "Abc@213",
        "confirmPassword": "Abc@123"
    }
    chai.request(app).post("/signup").send(user).end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property("status").eq("failed")
        response.body.should.have.property("error").eq("password and confirm password are not matching");
        
        done();
    
})


});





})

describe("GET /users/answer",()=>{

    it("it should get the value of question to respective id",(done)=>{
        let id = "64ce3a0762b7cd7be76a2f84"
        chai.request(app).get("/users/answer/"+id).end((err,response)=>{
            response.should.have.status(201)
            response.body.should.have.property("status").eq(201)
            response.body.should.have.property("message").eq("Answer get successfully")
            done()
        })
    })

    it("it should get the with having the value not equal to 24",(done)=>{
        let id = "64ce3a0762b7cd7be76a2f822"
        chai.request(app).get("/users/answer/"+id).end((err,response)=>{
            response.should.have.status(401)
            response.body.should.have.property("status").eq("failed")
            response.body.should.have.property("error").eq("Id must have length 24")
            done()
        })
    })
    
    


})
describe("POST /users/answer",()=>{
    it("it should not post without the answer Field",(done)=>{
        let answerValue={
            // "answer":"The back end refers",
            "userId": "643944cec1814cdca4c13856",
            "questionId":"6425262105b43aabf701d3dc"
        }

        chai.request(app).post("/users/answer").send(answerValue).end((err,response)=>{
            response.should.have.status(401)
            response.body.should.have.property("status").eq("failed")
            response.body.should.have.property("error").eq("answer is required")
            done()
        })
    })

    it("it should not post without the userId Field",(done)=>{
        let answerValue={
            "answer":"The back end refers",
            // "userId": "643944cec1814cdca4c13856",
            "questionId":"6425262105b43aabf701d3dc"
        }
        
        chai.request(app).post("/users/answer").send(answerValue).end((err,response)=>{
            response.should.have.status(401)
            response.body.should.have.property("status").eq("failed")
            response.body.should.have.property("error").eq("userId is required")
            done()
        })
    })
    it("it should not post without the questionId Field",(done)=>{
        let answerValue={
            "answer":"The back end refers",
            "userId": "643944cec1814cdca4c13856",
            // "questionId":"6425262105b43aabf701d3dc"
        }
        
        chai.request(app).post("/users/answer").send(answerValue).end((err,response)=>{
            response.should.have.status(401)
            response.body.should.have.property("status").eq("failed")
            response.body.should.have.property("error").eq("questionId is required")
            done()
        })
    })

    it("it should not post without the answer Field",(done)=>{
        let answerValue={
            "answer":"",
            "userId": "643944cec1814cdca4c13856",
            "questionId":"6425262105b43aabf701d3dc"
        }

        chai.request(app).post("/users/answer").send(answerValue).end((err,response)=>{
            response.should.have.status(401)
            response.body.should.have.property("status").eq("failed")
            response.body.should.have.property("error").eq("enter the answer")
            done()
        })
    })

    it("it should not post with empty userId Field",(done)=>{
        let answerValue={
            "answer":"The back end refers",
            "userId": "",
            "questionId":"6425262105b43aabf701d3dc"
        }
        
        chai.request(app).post("/users/answer").send(answerValue).end((err,response)=>{
            response.should.have.status(401)
            response.body.should.have.property("status").eq("failed")
            response.body.should.have.property("error").eq("userID can't be empty")
            done()
        })
    })
    it("it should not post with empty questionId Field",(done)=>{
        let answerValue={
            "answer":"The back end refers",
            "userId": "643944cec1814cdca4c13856",
            "questionId":""
        }
        
        chai.request(app).post("/users/answer").send(answerValue).end((err,response)=>{
            response.should.have.status(401)
            response.body.should.have.property("status").eq("failed")
            response.body.should.have.property("error").eq("questionId must have 24 character")
            done()
        })
    })
})

})
