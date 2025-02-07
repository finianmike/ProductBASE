const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({

    
name:{
    type: String,
    required :true,
},


password:{
    type: String,
    required :true,
},


email:{
    type: String,
    required :true,
},


phoneNumber:{
    type: Number,
    required :true,
    unique: true,
},


userName:{
    type: String,
    required :true,
    unique: true,
},


sex:{
    type: String,
    required :true,
    
},

marritalStatus:{
    type: String,
    required :true, 
},

// dob:{
//     type: Number,
//     required :true,
// },

},
{
    timestamps:true
}
)
const User = mongoose.model("User", UserSchema);
module.exports = User;

