import mongoose from "mongoose";
const jdSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    resumeId:{
        type:mongoose.Schema.ObjectId,
        ref:'Resume',
        title: String,
        company:String,
        url:String,
        rawText:String,
        extractedKeywords:[String],
        relevanceScore: Number
    }

},{timestamps:true});

export default mongoose.model("Job Description",jdSchema)