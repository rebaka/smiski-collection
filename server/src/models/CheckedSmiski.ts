import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CheckedSmiskiSchema = new Schema({
    username: { type: String, required: true },
    smiskiId: { type: Schema.Types.ObjectId, required: true },
    isChecked: { type: Boolean, required: true }
});

const CheckedSmiskiModel = mongoose.model("CheckedSmiski", CheckedSmiskiSchema);

export default CheckedSmiskiModel;