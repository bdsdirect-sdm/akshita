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
import { transporter } from "../middleware/mailer";

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

export const inviteFriend = async (req: any, res: any) => {
    try {
      const senderId = req.user.id;
      const { body } = req;  
      const checkEmailExists = async (email: string) => {
        return await User.findOne({ where: { email } });
      };
  
      const generateToken = (data: object): string => {
        const token = jwt.sign(data, securityKey, { expiresIn: '1h' });
        return token;
      };
  
      const sendEmail = async (to: string, subject: string, html: string) => {
        const mailOptions = {
          from: "dipchip1702@gmail.com",  
          to,
          subject,
          html,
        };
        try {
          const info = await transporter.sendMail(mailOptions);
          console.log(`Email sent to ${to}: ${info.response}`);
        } catch (error) {
          console.error(`Error sending email to ${to}:`, error);
        }
      };  
  
      const promises = body.map(async (item: { fullName: string; emails: string; message: string }) => {
        const { emails: email, fullName, message } = item;
        const user = await checkEmailExists(email);
        let token: string;
          let invitationLink: string;
        if (user) {
          await Friend.create({
            senderfriendId: senderId,
            email,
            receiverfriendId: user.id,
          });
          token = generateToken({
            senderfriendId: senderId,
            email,
            receiverfriendId: user.id,
          });
          invitationLink = `http://localhost:5173/login?token=${token}`;
        } else {
          // If email does not exist, generate token only with email
          token = generateToken({ senderfriendId: senderId, email });
          invitationLink = `http://localhost:5173/signup?token=${token}`;
        }
  
        // Send the invitation email with a custom message
        await sendEmail(
          email,
          "You're Invited by Your Friend!",
          `
            <html>
              <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
                <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                  <h1 style="color: #333;">You're Invited, ${fullName}!</h1>
                  <p style="color: #555;">Your friend has shared the following message:</p>
                  <blockquote style="background-color: #f9f9f9; padding: 10px; border-left: 5px solid #007BFF; margin: 10px 0; color: #555;">${message}</blockquote>
                  <p style="color: #555;">Here is the invitation link shared by your friend:</p>
                  <a href="${invitationLink}" style="display: inline-block; padding: 10px 20px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px; margin-top: 10px;">Accept Invitation</a>
                  <p style="color: #555; margin-top: 20px;">Click the link above to join us and get started!</p>
                  <p style="color: #333;">Best regards,<br>Team</p>
                </div>
              </body>
            </html>
          `
        );
      });
      await Promise.all(promises);                      
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