import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt'
import { envConfig } from "../../../config";



const userSchema = new Schema({
    
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    }
});


const User = model("User", userSchema);

export default User;


userSchema.pre("save", async function(){
    const hashPass = await bcrypt.hash(this.password, envConfig.salt_round);

    this.password = hashPass;
})