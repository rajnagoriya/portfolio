import express from "express";
import { creatProfile, getUserDeatails, addProfileData } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.js";
const router = express.Router();


router.post(
    "/creatProfile",
    upload.fields([
    { name: "profileImage", maxCount: 1 },  // For uploading a single profile image
    { name: "resume", maxCount: 1 }         // For uploading a single resume PDF
  ]),creatProfile);
router.get("/:id",getUserDeatails);
router.post("/addProfileData/:id",
  upload.fields([
    { name:"profileImg", maxCount:1},
    { name: "InstitutionImg", maxCount: 1 },  // For uploading a single profile image
    { name: "resume", maxCount: 1 }         // For uploading a single resume PDF
  ]),
  addProfileData);


const UserRouter = router;
export default UserRouter;