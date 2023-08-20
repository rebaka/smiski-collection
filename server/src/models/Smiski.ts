import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const SmiskiSchema = new Schema({
    id: Number,
    name: String,
    series: String, 
    description: String,
});

const SmiskiModel = mongoose.model("Smiski", SmiskiSchema);

export default SmiskiModel;