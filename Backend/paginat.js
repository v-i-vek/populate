/* eslint-disable radix */
const Question = require("./question.model");

const getQuestion = async (req, res) => {
    try {
        const question = await Question.find();
        return res.send(question);
    } catch (error) {
        console.log("Error ", error);
        return res.send(error);
    }
};

const getQustionPagination = async (req, res) => {
    try {
    // eslint-disable-next-line radix
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        let search = "";
        const skip = (page - 1) * limit;
        const totalLength = await Question.countDocuments();
        const sumOfPages = Math.ceil(totalLength / limit);
        if (req.query.search) {
            search = req.query.search;
            const pageSearchQuery = await Question.find().limit(limit).skip(skip).exec();
            const searchValue = pageSearchQuery.filter((val) => val.question.includes(search));
            return res.status(200).json({
                length: searchValue.length, location: "from search", data: searchValue, totalPages: sumOfPages,
            });
        }
        console.log(limit, page);
        const pagiQuestion = await Question.find({
            // $or:[
            //     {question:{$regex:'.*'+search+'.*',$options:'i'}},
            //     {questionDescribe:{$regex:'.*'+search+'.*',$options:'i'}},
            //     {tags:{$regex:'.*'+search+'.*',$options:'i'}}
            // ]
        })
            .limit(limit)
            .skip(skip)
            .exec();
        return res
            .status(200)
            .json({ Length: pagiQuestion.length, data: pagiQuestion, totalPages: sumOfPages });
    } catch (error) {
        console.log("Error", error);
        return res.status(400).json({ data: error });
    }
};

module.exports = { getQuestion, getQustionPagination };
