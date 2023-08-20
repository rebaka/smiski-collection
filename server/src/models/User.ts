import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { error } from 'console';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String, 
    username: String, 
    password: String, 
});

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword
        next()
    } catch(error) {
        next(error)
    }
})

UserSchema.methods.comparePassword = async function (enteredPassword) {
    try {
      return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
      throw error;
    }
  };

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;