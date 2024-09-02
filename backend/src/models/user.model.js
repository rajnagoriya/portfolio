import mongoose, { now } from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required:[true, "name is required"],
        default: "raj nagoriya"
    },
    email: {
        type: String,
        default: "rajnagoriya3@gmail.com",
        required:[true, "name is required"]
    },
    mobileNo : {
        type:Number
    },
    password: {
        type: String,
        required:  [true,"password is required"],
        default:"Mp41@ma5315",
        minlength: 6
    },
    profileImage: {
        type: String,
        required:[true,"profile img required"]
    },
    profileImagePublicId:{
        type:String,
        required:true
    },
    about: {
        type: String,
        maxlength: 350
    },
    resume: {
         link:{
            type: String
         },
         resumePublicId: {
            type:String
         }
    },                                                                                                                                     
    profileLinks: [ 
       {
        name: String,
        link: String,
        imgUrl:String,
        imgPublicId:String
       }
    ],
    skill: [
        {
            name:String,
        }
    ],
    project: [
        {
            name:String,
            heading:{
                type:String,
                required:[true, " project heading is required "]
            },
            discription:{
                type:String
            },
            link:String,
            startDate: Date,
            endDate: Date
        }
    ],
    experience: [
        {
            role:String,
            heading:{
                type:String,
                required:[true, " expirence heading is required "]
            },
            discription:{
                type:String
            },
            companyName:String,
            startDate: Date,
            endDate: Date
        }
    ],
    education: [
        {
            InstitutionImg:{
                type: String
            },
            InstitutionPublicId:{
                type:String
            },
            nameOfInstitution:{
                type: String,
                required:[true, "Institution name is required"]
            },
            typeOfCourse:{
                type: String,
                required: [true, "course type is required "]
            },
            score: {
                type: Number,
                required:[ true, "score is required"]
            },
            startDate:{
                type:Date,
                required: [true, "start date is required"]
            },
            endDate:{
                type:Date,
                required: [true, "end date is required"]
            }
        }
    ]
},{
    timestamps: true
});

const User = mongoose.model('User', UserSchema);
export default  User;
