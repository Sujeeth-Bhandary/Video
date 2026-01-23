import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema=new Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        index:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },fullname:{
        type:String, 
        required:true,
        trim:true
    },
    avatar:{
        type:String,//cloudinary url used
        required:true,
    },
    coverImage:{
        type:String,//cloudinary url used
    },
    watchHistory:[{
        type:Schema.Types.ObjectId,
        ref:"Video"
    }],
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    refreshToken:{
        type:String,
    },
},{
    timestamps:true
});
userSchema.pre("save",async function(next){
    if (!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
})
userSchema.methods.isPasswordMatch=async function (password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken=function () {
    jwt.sign({
        _id:this._id,
        name:this.name,
        email:this.email,
        fullname:this.fullname,
    },process.env.ACCESSS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}
userSchema.methods.generateRefreshToken=function () {
    jwt.sign({
        _id:this._id,
    },process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}
export const User=mongoose.model("User",userSchema);