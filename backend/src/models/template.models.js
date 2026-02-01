import mongoose from "mongoose";
const templateSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    previewImage: String,
    structure:{
        type:Object,
        default: {}
    },
    atsCompliant:{
        type:Boolean,
        default:true
    },
    isPremium:{
        type:String,
        default: false
    },
    category:{
        type: String,
        enum:['tech','finance','general']
    }
});
export default mongoose.model("Template",templateSchema);
