import { model, Schema } from "mongoose";
import { IUser, ROLE } from "./user.interface";
import { hashPassword } from "../../../helpers/hashPasword";



const userSchema = new Schema<IUser>({
    
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
    },
    role: {
        type: String,
        enum: ROLE,
        default: "user"
    },
    avatar: String,
    profile:{
        age: String,
        bio: String
    },
    trips: [
        {
            type: Schema.Types.ObjectId,
            ref:"Trip"
        }
    ],
    buddyRequest: [
        {
            type: Schema.Types.ObjectId,
            ref:"Buddy"
        }
    ]
},{timestamps:true});


userSchema.pre("save", async function () {
    const hashedPassword = await hashPassword(this.password);
    
	this.password = hashedPassword;
});


const User = model<IUser>("User", userSchema);
export default User;


