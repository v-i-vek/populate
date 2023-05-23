export interface Answer {
    _id:string;
    userId:{
        firstName: string;
        lastName: string;
       }
    questionId:{
        _id: string;
    }
    answer: string;
    upvotes:string[],
    downvotes:string[];
    createdAt: Date;
    updatedAt:Date;
}