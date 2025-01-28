import User from "../models/users.model";
import jwt, { JwtPayload } from "jsonwebtoken"
import bcrypt from 'bcrypt';
import { Local } from "../env";
const securityKey: any = Local.SECRET_KEY;
import { Request, Response } from "express";
import Preferences from "../models/preferences.model";
import Waves from "../models/waves.model";
import Comment from "../models/comments.model";
import Friend from "../models/friends.model";
import Comments from "../models/comments.model";
import { sendLoginEmail, sendSignupEmail } from "../utils/mailer"

/* POST */

export const signup = async (req: Request, res: Response) => {
    try{
        const {firstName, lastName, phone, email, password} = req.body;
            
        const isExist = await User.findOne({where: {email: email}});
        if(isExist){
            res.status(401).json({"message": "User already exists"});
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({firstName, lastName, phone, email, 
                password: hashedPassword,
                profile_photo: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
            });
        }

        // const {token} = req.query;
        console.log("TOKENNNN", req.params)
        // if(token) {
        //     const decoded = jwt.verify(token, securityKey as string) as JwtPayload;
        //     const { senderId } = decoded;
        //     console.log("DECODEDDDD", decoded);
        //     const newFriend = await Friend.findOne({where: {sender: senderId}});
        //     if( newFriend ) {
        //         newFriend.status = "accepted"
        //         await newFriend.save();
        //     }
            
        // }
    }
        catch(err){
        res.status(500).json({"message": err});
    }
}

export const loginUser = async (req: any, res: Response) =>{
    try{
        const {email, password} = req.body;
        console.log(req.body);
        const user = await User.findOne({where: {email: email}});
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                //if token in params, it means friend already exists.
                //else we check if current user is someone's friend, and add their user id
                const {token} = req.params;
                if(token) {
                    const decoded = jwt.verify(token, securityKey as string) as JwtPayload;
                    const { senderId } = decoded;
                    console.log("DECODEDDDD", decoded);
                    const newFriend = await Friend.findOne({where: {sender: senderId}});
                    if( newFriend ) {
                        newFriend.receiver = user.id;
                        newFriend.status = "accepted"
                        await newFriend.save();
                    }
                    
                } 
                else {
                    const newFriend = await Friend.findOne({where: {receiverEmail: email}})
                    if(newFriend?.status === "accepted") {
                        newFriend.receiver = user.id;
                    }
                }
                const tk = jwt.sign({id: user.id}, securityKey);
                console.log("HELOOO",tk)
                res.status(200).json({"token": tk, "user":user, "message":"Login Successful"});
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
        const { id } = req.user; 
        console.log("IHHHH", id)
        var videos = null;
        var photos = null;
        const { post } = req.body;
        const user = await User.findOne({where: {id: id}});
        const fullName = user?.firstName + " " + user?.lastName;
        const profilePhoto = user?.profilePhoto;
        
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
            videos: videos ? videos : null,
            fullName: fullName,
            profilePhoto: profilePhoto
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

/* check if receiver already exists
If he does, redirect to login page
if he doesnt, redirect to signup page
*/
export const inviteFriend = async (req: any, res: any) => {
    try {
      const senderId = req.user.id;
      const friends = req.body.friends; 
      console.log("FRIENDSS", friends.friends)
      const sender = await User.findOne({where: {id: senderId}});
      const senderName = sender?.firstName + " " + sender?.lastName;

      for (const friend of friends) {
        const { fullName, email, message } = friend;
        const token = jwt.sign({ senderId }, securityKey, { expiresIn: '1h' });
  
        const user = await User.findOne({ where: { email } });
  
        if (user) {
          const isFriend = await Friend.findOne({ where: { email } });
          if (isFriend) {
            console.log(`${email} is already added as a friend.`);
          } else {
            sendLoginEmail(token, email, fullName, message, senderName);
            console.log(`${email} is added as a friend.`);
            const newFriend = await Friend.create({sender: senderId, receiverEmail: email, status: "pending" });
            console.log(`${email} is added as a friend.`);
          }
        } else {
          sendSignupEmail(token, email, fullName, message, senderName);
          const newFriend = await Friend.create({sender: senderId, receiverEmail: email, status: "pending" });
          console.log(`${email} is added as a friend.`);
        }
      }
      res.status(200).json({ message: "Invitation emails sent successfully." });
  
    } catch (error) {
      console.error("Error in inviteFriend:", error);
      res.status(500).json({ error: "Failed to send invitation emails." });
    }
  };

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

//remaining
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

//remaining
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

export const getWaves = async (req: any, res: any) => {
    try {
        const waves = await Waves.findAll({
            order: [
              ['createdAt', 'DESC'], 
            ]});
          if(waves) {
            res.status(200).json({"Waves": waves, "message": "Waves received"});
        } else {
            res.status(404).json({ message: 'Waves not found' });
        }
        
    }  catch(err){
        res.status(500).json({"message":`Error--->${err}`})
    }
}

export const getWave = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const waves = await Waves.findOne({where: {id: id}});
        if(waves) {
            res.status(200).json({"Wave": waves, "message": "Wave received"});
        } else {
            res.status(404).json({ message: 'Waves not found' });
        }
        
    }  catch(err){
        res.status(500).json({"message":`Error--->${err}`})
    }
}

