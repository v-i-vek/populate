export interface Question {
    _id:string;
    userId:{
     firstName: string;
     lastName: string;
    },
    answer:{
        answer:string
    }
    question: string;
    questionDescribe:string,
    tags:string[];
    createdAt: Date;
    updatedAt: Date; 
}
