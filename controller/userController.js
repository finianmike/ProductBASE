const bcrypt = require("bcrypt");
const User = require("../module/userModule.js");


const registerUser = async (req, res) => {
    try {
       let {name, email, userName, password, phoneNumber, sex, marritalStatus} = req.body;

//VALIDATION REQUIRED FIELDS

       if (!name || !email || !userName || !password || !phoneNumber || !sex || !marritalStatus)
        return res.status(400).json({message: "ALL FIELDS MUST BE COMPLETED"});

//HASH THE PASSWORD
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

//save user in database
const newUser = new User({
    name, email, userName, password: hashedPassword, phoneNumber, sex, marritalStatus,
})
const registerUser = await newUser.save();
res.status(201).json(registerUser);

    } catch (err) {
    console.error("registration Error", err);
    
    //handle duplicate user

    if (err.code === 11000) {
        return res.status(400).json({
            message: "User already exist",
            field: Object.keys(err.keyValue),
        });
    }
    res.status(500).json({message: "Registration error", err: err.message});
    }
};


//login user
const loginUser = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        console.log(req.body);

        if (!phoneNumber || !password) {
            return res.status(400).json({ message: "Phone number and password required" });
        }

        // Find the user by phoneNumber
        const user = await User.findOne({ phoneNumber });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Exclude the password before returning user details
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json(userResponse);
        console.log("User logged in:", user.phoneNumber);
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Login error", error });
    }
};



// const loginUser = async (req, res) => {
//     try {
//        const {phoneNumber, password} = req.body;
//        console.log(req.body)

//        if (!phoneNumber || !password) {
//         return res.status(400).json({message: "phonenumber and password required"});
//        }

//        //find the user by phonenumber
//        const user = await User.findByOne({phoneNumber});
    
//        if (!user) {
//         return res.status(404).json({message: "USER NOT FOUND"});
//        }
     
    
//        //COMPARE PASSWORD

//        const isMatch = await bcrypt.compare(password, user.password);
//        if (!isMatch) {
//         return res.status(404).json({message: "INVALID PASSWORD"});
//        }
//        res.status(200).json(user);
//        console.log(user)
//     } catch (error) {
//       res.status(500).json({message: "LOGIN ERROR", error});  
//     }
// };

//UPDATE USER

const updateUser = async (req, res) => {
    try {
       const {id} = req.params;
       //find user by id
       const user = await User.findById(id);
       if (!user) {
        return res.status(404).json({message: "User Not Found"});
       } 

       //find user fields
       const updatedData = req.body;

       //only hash password if its updated
       if (updatedData.password) {
        const salt = await bcrypt.genSalt(10);
        updatedData.password = await bcrypt.hash(updatedData.password, salt);
       }

       //update user in the database
       const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
        new: true, //return the updated document
        runValidators: true, //enforce validators rule
       });
       res.status(200).json({message: "User Updated Successfully", updatedUser});

    } catch (error) {
        console.error("Error updating user", error);
        res.status(500).json({message: "Error Updating User", error: error.message});
    }
    };

    let deletUser = async (req, res) => {
        try {
           const {id} = req.params;
           //check if user exist
           const user = User.findById(id);
           if (!user) {
            return res.status(404).json({message: "User Not Found"});
           } 
           //delete the user
           await user.deleteOne();
           res.status(200).json({message: "user deleted successfully"});
        } catch (error) {
            console.error("Error deleting user", error);
            res.status(500).json({message: "Error deleting user", error: error.message});
        }
    };

    //get all users

    const getAllUser = async (req, res) => {
        try {
            const user = await User.find({});
            res.status(200).json(user);
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
    };

//get user by id
const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
    //find user by id
    const user = await User.findById(id);
    if (!user) {
        return res.status(400).json({message: "user not found"});
    }
    res.status(200).json(user);
    } catch (error) {
     console.error("Error retriving user", error); 
     if (error.kind === "objectId") {
        return res.status(400).json({message: "invalid user ID format"})
     } 

     res.status(500).json({message: "Error retriving user", error: error.message})
    }
}

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deletUser, 
    getAllUser, 
    getUserById,
};