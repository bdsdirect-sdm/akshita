import User from "../models/users.model";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { Local } from "../env";
const securityKey: any = Local.SECRET_KEY;
import { Request, Response } from "express";
import Preferences from "../models/preferences.model";
import Waves from "../models/waves.model";
import Comment from "../models/comments.model";
import Friend from "../models/friends.model";
import Comments from "../models/comments.model";

/* POST */

export const signup = async (req: Request, res: Response) => {
    console.log("RIIIP", req.file)
    try{
        const {firstName, lastName, phone, email, password} = req.body;
        console.log("HELELELELEL", req.body)
            
        const isExist = await User.findOne({where: {email: email}});
        if(isExist){
            res.status(401).json({"message": "User already exists"});
        }
        else{

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({firstName, lastName, phone, email, 
                password: hashedPassword,
                profile_photo: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`});
        }
    }
        catch(err){
        res.status(500).json({"message": err});
    }
}

export const loginUser = async (req: Request, res: Response) =>{
    try{
        const {email, password} = req.body;
        console.log(req.body);
        const user = await User.findOne({where: {email: email}});
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                
                const token = jwt.sign({id: user.id}, securityKey);
                console.log("HELOOO",token)
                res.status(200).json({"token":token, "user":user, "message":"Login Successfull"});
            }
            else{
                res.status(403).json({"message": "Invalid Password"});
            }
        }
        else{
            res.status(403).json({"message":"User doesn't Exist"});
        }
    }
    catch(err){
        res.status(500).json({"message":err});
    }
}

export const createWave = async (req: any, res: any) => {
    try {
        const id = req.user;
        var videos = null;
        var photos = null;
        const { post } = req.body;

        console.log("REQUESTTTTT", req.files);

        
        if(req.files) {
            const files = req.files;
            if (req.files['photos']) {
                photos = files?.photos[0]?.path;   
            }
            if (req.files['videos']) {
                videos = files?.videos[0]?.path;   
            }
        }
        
        const wave = await Waves.create({
            userId: id,
            post: post,
            photos: photos ? photos : null,
            videos: videos ? videos : null
        });
        if(wave) {
            return res.status(200).json({"message": "Wave Created Successfully"});
        } else {
            return res.status(500).json({"message": "Something went wrong"});
        }

    }  catch(err){
        res.status(500).json({"message":`Error--->${err}`})
    }
}

export const addComment = async (req: any, res: any) => {
    try {
        // const waveId = req.params.id;
        // const { comment } = req.body;
        // const newComment = await Comments.create({comment, waveId});
        // return res.status(200).json({"message": "Comment Added Successfully"});
    }  catch(err){
        res.status(500).json({"message":`Error--->${err}`})
    }
}

/* PUT */


export const changePassword = async (req: any, res: any) => {
    try {
        const { id } = req.user;
        const { oldPassword, newPassword } = req.body; 
        const user = await User.findOne({ where: { id: id } });

        if (user) {
            const isMatch = await bcrypt.compare(oldPassword, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Incorrect old password' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();  
            return res.status(200).json({ message: 'Password updated successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    }  catch(err){
        res.status(500).json({"message":`Error--->${err}`})
    }
}

export const updatePersonalDetails = async (req: any, res: any) => {
    try {
        const { id } = req.user; 
        console.log("IHHHH", id)
        const { dob, gender, phone, email } = req.body;
        const details = await User.findOne({where:{id: id}});
        if(details) {
            details.dob = dob;
            details.gender = gender;
            details.phone = phone;
            details.email = email;

            await details?.save();
            return res.status(200).json({ message: 'Details updated successfully' });
        }
        else {
            res.status(400).json({message:`User details not found`})
        }
    }  catch(err){
        res.status(500).json({"message":`Error--->${err}`})
    }
}

export const updateBasicDetails = async (req: any, res: any) => {
    try {
        const { id } = req.user; 
        const { firstName, lastName, phone, email, address, city, state, zip } = req.body;
        const details = await User.findOne({where:{id: id}});
        if(details) {
            details.firstName = firstName;
            details.lastName = lastName;
            details.phone = phone;
            details.email = email;
            details.address = address;
            details.city = city;
            details.state = state;
            details.zip = zip;
            await details?.save();
            return res.status(200).json({ message: 'Details updated successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    }  catch(err){
        res.status(500).json({"message":`Error--->${err}`})
    }
}

export const changePicture = async (req: Request, res: any) => {
    try {
        const { userId } = req.params; 
        const user = await User.findByPk(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const pfp = req.file?.path;
        if (!pfp) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        user.profilePhoto = pfp;
        await user.save();

        return res.status(200).json({ message: 'Profile Picture updated successfully' });
    } catch (err) {
        res.status(500).json({"message":`Error--->${err}`})
    }
}

export const updatePreferences = async (req: Request, res: any) => {
    try {
        const { userId } = req.params;
        const { language, breakfast, lunch, dinner, wakeTime, bedTime, weight, height, sms, post } = req.body;
        const preferences = await Preferences.findOne({where: { userId: userId }, include: {model: User, as: 'user'}});
        if(!preferences) {
            const p = await Preferences.create({
                breakfast,
                language,
                lunch,
                dinner,
                wakeTime,
                bedTime,
                weight,
                height,
                sms,
                post, 
                userId
            });
            return res.status(200).json({ message: 'Preferences created successfully' });
        }
        else if(preferences) {
            preferences.language = language;
            preferences.breakfast = breakfast;
            preferences.lunch = lunch;
            preferences.dinner = dinner;
            preferences.wakeTime = wakeTime;
            preferences.bedTime = bedTime;
            preferences.weight = weight;
            preferences.height = height;
            preferences.sms = sms;
            preferences.post = post;
            
            await preferences?.save();
            return res.status(200).json({ message: 'Preferences updated successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
        
    }  catch(err){
        res.status(500).json({"message":`Error--->${err}`})
    }
}

/* GET */

// export const getFriends = async (req: Request, res: Response) => {
//     try {
//         const id = req.body;
//         const friends = await Friends.findAll({where: {id: id}});
//         res.status(200).json({"Friend List": friends, "message": "Friend List received"});
//     }  catch(err){
//         res.status(500).json({"message":`Error--->${err}`})
//     }
// }

// export const getWaves = async (req: Request, res: Response) => {
//     try {
//         const id = req.body;
//         const waves = await Waves.findAll();
//         res.status(200).json({"Wave": details, "message": "Basic Details received"});
//     }  catch(err){
//         res.status(500).json({"message":`Error--->${err}`})
//     }
// }

export const getBasicDetails = async (req: any, res: any) => {
    try {
        const { id } = req.user;  
        const details = await User.findOne({where: {id: id}});
        if(details) {
            return res.status(200).json({"BasicDetails": details, "message": "Basic Details received"});
        } else {
            return res.status(404).json({ message: 'Details not found' });
        }
        
    }  catch(err){
        return res.status(500).json({"message":`Error--->${err}`})
    }
}

export const getPersonalDetails = async (req: any, res: any) => {
    try {
        const { id } = req.user;
        const details = await User.findOne({where: {id: id}});
        if(details) {
            res.status(200).json({"PersonalDetails": details, "message": "Personal Details received"});
        } else {
            res.status(404).json({ message: 'Details not found' });
        }
        
    }  catch(err){
        res.status(500).json({"message":`Error--->${err}`})
    }
}

export const getPreferences = async (req: any, res: any) => {
    try {
        const { id } = req.user; 
        const preferences = await Preferences.findOne({where: { userId: id }, include: {model: User, as: 'user'}});
        if(preferences) {
            res.status(200).json({"Preferences": preferences, "message": "Preferences received"});
        } else {
            res.status(404).json({ message: 'Details not found' });
        }
        
    }  catch(err){
        res.status(500).json({"message":`Error--->${err}`})
    }
}