import { asyncHandler } from "../utils/asyncHandler.js";
import CustomError from "../utils/custoErrorClass.js";
import User from "../models/user.model.js";
import fs from "fs";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const creatProfile = asyncHandler(async (req, res, next) => {
  const { userName, email, mobileNo, password } = req.body;

  const profileImage = req.files['profileImage'] ? req.files['profileImage'][0] : null;
  if (!userName || !email || !mobileNo || !password, !profileImage) {
    // await remove file from upload foler and return
    fs.unlinkSync(photo.path);
    return next(new CustomError(400, "please enter all the filed"));
  }

  // if all things are perfect then upload photo to cloudinary 
  const response = await uploadOnCloudinary(profileImage.path);

  if (!response) {
    return next(new CustomError(400, "file upload failed !!"));
  }
  const publicId = response.public_id;
  const imgUrl = response.url;

  let user = await User.create({
    userName,
    email,
    mobileNo,
    password,
    profileImage: imgUrl,
    profileImagePublicId: publicId
  });

  res.status(200).json(
    {
      success: true,
      user
    }
  )
});

export const getUserDeatails = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) return next(new CustomError(400, "user not found"));

  //Convert Mongoose document to a plain JavaScript object
  const userObject = user.toObject();

  // Destructure to exclude the password from the user object
  const { password, ...userWithoutPassword } = userObject;

  res.status(200).json({
    success: true,
    data: userWithoutPassword
  });
});

export const addProfileData = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { skill, about, project, experience } = req.body;
  const { nameOfInstitution, typeOfCourse, score, startDate, endDate } = req.body;
  const {name,link} = req.body;
  const resume = req.files['resume'] ? req.files['resume'][0] : null;
  const InstitutionImg = req.files['InstitutionImg'] ? req.files['InstitutionImg'][0] : null
  const profileImg = req.files['profileImg'] ? req.files['profileImg'][0] : null;

  const user = await User.findById(id);
  if (!user) return next(new CustomError(400, "User not found"));


  if(about){
    user.about = about;
  }


  if (resume) {

    const response = await uploadOnCloudinary(resume.path);

    if (!response) {
      return next(new CustomError(400, "file upload failed !!"));
    }
    const publicId = response.public_id;
    const imgUrl = response.url;
    user.resume.link = imgUrl;
    user.resume.resumePublicId = publicId;
  }

  // Update Skills
  if (skill) {
    if (Array.isArray(skill)) {
      // console.log(user.skill);
      // user.skill.push(...skill);
      skill.map((i) => user.skill.push(i));
    } else if (typeof skill === "object" && skill.name) {
      user.skill.push(skill);
    } else {
      return next(new CustomError(400, "Invalid skill format"));
    }
  }

  let profileLinkArr = [];
  if(profileImg){
   const response = await uploadOnCloudinary(profileImg.path);

    if (!response) {
      return next(new CustomError(400, "file upload failed !!"));
    }
    const publicId = response.public_id;
    const imgUrl = response.url;
  // Update Profile Links

  profileLinkArr = [{
    name,
    link,
    imgUrl: imgUrl,
    imgPublicId:publicId
   }];
  }

  if (profileLinkArr) {
    
    if (Array.isArray(profileLinkArr)) {
      profileLinkArr.map((i) => user.profileLinks.push(i));

    } else if (typeof profileLinkArr === "object" && profileLinkArr.name && profileLinkArr.link) {
      user.profileLinks.push(profileLinkArr);
    } else {
      return next(new CustomError(400, "Invalid profile link format"));
    }
  }

  // Update Projects
  if (project) {
    if (Array.isArray(project)) {
      user.project.push(...project);
    } else if (typeof project === "object" && project.name && project.heading) {
      user.project.push(project);
    } else {
      return next(new CustomError(400, "Invalid project format"));
    }
  }

  // Update Experience
  if (experience) {
    if (Array.isArray(experience)) {
      console.log("uppr ex. ==" + experience);
      user.experience.push(...experience);
    } else if (typeof experience === "object" && experience.role && experience.heading) {
      console.log("lower ex. ==" + experience);
      user.experience.push(experience);
    } else {
      return next(new CustomError(400, "Invalid experience format"));
    }
  }
  let education = [];
  if(InstitutionImg){
   const response = await uploadOnCloudinary(InstitutionImg.path);

    if (!response) {
      return next(new CustomError(400, "file upload failed !!"));
    }
    const publicId = response.public_id;
    const imgUrl = response.url;
    education = [{ 
      InstitutionImg : imgUrl,
      InstitutionPublicId : publicId, 
      nameOfInstitution, 
      typeOfCourse, 
      score, 
      startDate, 
      endDate 
    }]
  }

  // Update Education
  if (education) {
    if (Array.isArray(education)) {
      console.log("upper education ==" + education);
      user.education.push(...education);
    } else if (
      typeof education === "object" &&
      education.nameOfInstitution &&
      education.typeOfCourse
    ) {
      console.log("lower education ==" + education)
      // user.education.push(education);
    } else {
      return next(new CustomError(400, "Invalid education format"));
    }
  }

  // Save the updated user document
  await user.save();

  // Exclude password from response
  const { password, ...userWithoutPassword } = user.toObject();

  res.status(200).json({
    success: true,
    message: "added  successfully",
    data: userWithoutPassword,
  });
});