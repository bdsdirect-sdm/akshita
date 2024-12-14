import { Local } from "../environment/env";
import PDFDocument from 'pdfkit';
import Address from "../models/Address";
import Patient from "../models/Patient";
import sendOTP from "../utils/mailer";
import User from "../models/User";
import { Response } from 'express';
import jwt from "jsonwebtoken";
import { Op, where } from "sequelize";
import bcrypt from 'bcrypt';
import Appointment from "../models/Appointment";
import Message from "../models/Message";
import Staff from "../models/Staff";

const Security_Key:any = Local.SECRET_KEY;

const otpGenerator = () => {
    return String(Math.round(Math.random()*10000000000)).slice(0,6);
}

export const  registerUser = async (req:any, res:Response) => {
    try{
        const {firstname, lastname, doctype, email, password} = req.body;
        const isExist = await User.findOne({where:{email:email}});
        if(isExist){
            res.status(401).json({"message":"User already Exist"});
        }
        else{

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({firstname,  lastname, doctype, email, password: hashedPassword});
            if(user){
                const OTP = otpGenerator();
                sendOTP(user.email, OTP);
                res.status(201).json({"OTP":OTP, "message":"Data Saved Successfully"});
            }
            else{
                res.status(403).json({"message":"Something Went Wrong"});
            }
        }
    }
        catch(err){
        res.status(500).json({"message": err});
    }
}

export const verifyUser = async (req:any, res:Response) =>{
    try{
        const {email} = req.body;
        const user = await User.findOne({where:{email}});
        if(user){
            user.is_verified = true;
            user.save();
            res.status(200).json({"message": "User Verfied Successfully"});
        }
        else{
            res.status(403).json({"message":"Something Went Wrong"})
        }
    }
    catch(err){
        res.status(500).json({"message":err})
    }
}

export  const loginUser = async (req:any, res:Response) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({where:{email}});
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                if(user.is_verified){
                    const token = jwt.sign({uuid:user.uuid}, Security_Key);
                    res.status(200).json({"token":token, "user":user, "message":"Login Successfull"});
                }
                else{
                    const OTP = otpGenerator();
                    sendOTP(user.email, OTP);
                    res.status(200).json({"user":user, "OTP":OTP, "message": "OTP sent Successfully"});
                }
            }
            else{
                res.status(403).json({"message":"Invalid Password"});
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

export const getUser = async (req:any, res:Response) => {
    try{
        const {uuid} = req.user;
        console.log("HELLLOOOOO")
        const user = await User.findOne({where:{uuid:uuid}, include:Address});
        if(user){
            const referCount = await Patient.count({where:{ referedto:uuid }});
            const referCompleted = await Patient.count({where:{ referedto:uuid, referalstatus:1 }});
            let docCount;

            if(user.doctype == 1){
                docCount = await User.count({where:{ is_verified:1 }});
            }
            else{
                docCount = await User.count({where:{ is_verified:1, doctype:1 }});
            }
            res.status(200).json({"user":user, "message":"User Found", "docCount":docCount, "referCount":referCount, "referCompleted":referCompleted});
        }
        else{
            res.status(404).json({"message":"User Not Found"})
        }
    }
    catch(err){
        res.status(500).json({"message":`Error--->${err}`})
    }
}

export const getDocList = async(req:any, res:Response) => {
    try{
        const {uuid} = req.user;
        const user = await User.findOne({where:{uuid:uuid}})
        let docList;
        if(user?.doctype==1){
            docList = await User.findAll({ where: { uuid: {[Op.ne]: uuid} }, include:Address });
        }
        else{
            docList = await User.findAll({ where: { doctype:1, uuid: {[Op.ne]: uuid} }, include:Address });
        }
        if(docList){
            res.status(200).json({"docList":docList, "message": "Docs List Found"});
        }
        else{
            res.status(404).json({"message": "MD List Not Found"});
        }
    }
    catch(err){
        res.status(500).json({"message":`${err}`});
    }

}

export const getPatientList = async(req:any, res:Response) => {
    try{
        const {uuid} = req.user;
        const { search } = req.query
        const user = await User.findOne({where:{uuid:uuid}});
        if (user) {
            const whereCondition: any = {
              [Op.or]: [{ referedby: uuid }, { referedto: uuid }],
            };
      
            if (search) {
              whereCondition.firstname = {
                [Op.like]: `%${search}%`,
              };
            }

            const patientList: any = await Patient.findAll({ where: whereCondition });
            if(patientList){
                const plist: any[] = [];
                
                for (const patient of patientList) {
                    const [referedtoUser, referedbyUser, address] = await Promise.all([
                        User.findOne({ where: { uuid: patient.referedto } }),
                        User.findOne({ where: { uuid: patient.referedby } }),
                        Address.findOne({ where: { uuid: patient.address } }),
                    ]);

                    const appointment = await Appointment.findOne({ where: {patient: patient.uuid}});
                    // console.log("APPOINTMENT:::::::::", appointment)
                    // console.log("JJJJJJJJJJJJJJJJJJJJJJJJJJJJ", patient)

                    const newPatientList: any = {
                        uuid: patient.uuid,
                        firstname: patient.firstname,
                        lastname: patient.lastname,
                        disease: patient.disease,
                        referalstatus: patient.referalstatus,
                        referback: patient.referback,
                        referedon: patient.createdAt,
                        updatedAt: patient.updatedAt,
                        referedto: referedtoUser,
                        referedby: referedbyUser,
                        address: address,
                        dob: patient.dob,
                        appointmentDate: appointment?.date,
                        notes: appointment?.notes,
                        appointmentType: appointment?.type,
                        appointmentStatus: appointment?.status
                    };

                    plist.push(newPatientList);
                }
                
                // console.log("Data----->", plist);
                res.status(200).json({"patientList":plist, "message":"Patient List Found"});
            }
            else{
                res.status(404).json({"message":"Patient List Not Found"});
            }
        }
        else{
            res.status(404).json({"message":"User Not Found"});
        }
    }
    catch(err){
        res.status(500).json({"message":`${err}`});
    }
}

export const addPatient = async(req:any, res:Response) => {
    try{
        const {uuid} = req.user;
        const user = await User.findOne({where:{uuid:uuid}});
        if(user){
            const {dob,
                email,
                phone,
                firstname,
                lastname,
                gender,
                disease,
                laterality,
                referback,
                timing,
                referedto,
                address,
                notes} = req.body;
            const  medicaldocs  = req.file.path;
            // console.log("USERRRRRR", req.body.dob)
            // console.log("USERRRRRR", req.file)
            const patient = await Patient.create({ dob,
                email,
                phone,
                firstname,
                lastname,
                gender,
                disease,
                laterality,
                referback,
                timing,
                referedto,
                address,
                notes, referedby:uuid, medicaldocs });
            if(patient){
                res.status(200).json({"message": "Patient added Successfully"});
            }
        }
        else{
            res.status(401).json({"message":"you're not Authorised"});
        }
    }
    catch(err){
        res.status(500).json({"message":`${err}`});
    }
}

export const addAddress = async(req:any, res:Response) => {
    try{
        const {uuid} = req.user;
        // console.log("USER:::::::::::::::::", uuid);
        const user = await User.findOne({where:{uuid:uuid}});  //find current doc
        if(user){
            const {street, district, city, state, pincode, phone} = req.body;
            const address = await Address.create({street, district, city, state, pincode, phone, user:uuid});
            if(address){
                res.status(200).json({"message": "Address added Successfully"});
            }
            else{
                res.status(400).json({"message":"Error in Saving Address"});
            }
        }
        else{
            res.status(401).json({"message":"you're not Authorised"});
        }
    }
    catch(err){
        res.status(500).json({"message":`${err}`});
    }
}

export const getReferredPatients = async (req: any, res: any) => {
    try {
        const {uuid} = req.user;
        const user = await User.findOne({where:{uuid:uuid}});  //finds current doc
        const patients = await Patient.findAll({where: {referedto: uuid}});  //gets all patients referred to current doc
        // console.log("USERRRRRRRRR", patients)
        res.status(200).json({"patientList":patients, "message":"Patient List Found"});
    } catch (err) {
        res.status(500).json({message: "internal server error", err});
    }
}

export const addAppointments = async (req: any, res: any) => {
    try {
        const {uuid} = req.user;
        const user = uuid;
        const {patient, date, type, notes} = req.body;
        // console.log("REQ:::::::::::::::",req.body)
        const appointment = await Appointment.create({patient, date, type, notes, user, status: "Scheduled"});
        if(appointment) {
            res.status(200).json({message: "Appointment added successfully."})
        }
        else {
            res.status(400).json({message: "Error in saving appointment."})
        }
    } catch (err) {
        res.status(500).json({message: "internal server error", err});
    }
}

export const viewAppointments = async(req: any, res: any) => {
    try {
        const uuid = req.user.uuid;  //current doc id
        const appointmentList = await Appointment.findAll({where: {user: uuid}});
        const apList = [];
        for(const appointment of appointmentList) {
            const patient = await Patient.findOne({where: {uuid: appointment.patient}})
            // console.log('PATIENT APP:::::::::::', patient)
            const newAppointmentList = {
                name: patient?.firstname + " " + patient?.lastname,
                date: appointment.date,
                type: appointment.type,
                status: appointment.status,
                patient: patient,
                id: appointment.uuid
            }
            apList.push(newAppointmentList);
        }
        
        res.status(200).json({"appointmentList": apList, "message":"Appointment List Found"});
    } catch (err) {
        res.status(500).json({message: "Internal server error", err});
    }
}

export const updateAppointmentStatus = async (req: any, res: any) => {
    try {
        const { appointmentStatus, patientId, appointmentId } = req.body;
        const appointment = await Appointment.findOne({where: [{patient: patientId}, {uuid: appointmentId}]});
        if(appointment) {
            appointment.status = appointmentStatus
        }
        await appointment?.save();
    } catch (err) {
        res.status(500).json({message: "Internal server error", err});
    }
}

export const viewAppointment = async(req: any, res: any) => {
    try {
        const { id } = req.params;
        // console.log("ID:::::::::::", id)
        const appointment = await Appointment.findOne({where: {uuid: id}, include: Patient} );
        res.status(200).json({"appointmentData": appointment, "message": "Appointment data received"});
    } catch (err) {
        res.status(500).json({message: "Internal server error", err});
    }
}

export const editAppointment = async (req: any, res: any) => {
    try {
      const id = req.params.id;
      const { date, type, notes } = req.body;
    //   console.log("PATIENT DATA:", req.body);
      const appointment = await Appointment.findOne({
        where: { uuid: id },
        include: [{ model: Patient }]
      });
  
      if (appointment) {
        appointment.date = date
        appointment.type = type
        appointment.notes = notes
        await appointment.save();
        res.status(200).json({ message: "Patient updated successfully" });
      } else {
        res.status(404).json({ message: "Patient not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error", err });
    }
}

export const deletePatient = async (req: any, res: any) => {
    try {
        const id = req.params.id;
        await Patient.destroy({where: {uuid: id}});
        res.status(200).json({message: "Patient deleted."});
    } catch (err) {
        res.status(500).json({message: "Internal server error", err})
    }
}

export const viewPatient = async (req: any, res: any) => {
    try {
        const id = req.params.id;
        const patient = await Patient.findOne({where: {uuid: id}, include: [{model: User}, {model: Address}, {model: Appointment}]});
        res.status(200).json({"patientData":patient, "message": "Patient data received"});
    } catch (err) {
        res.status(500).json({message: "Internal server error", err})
    }
}

//tbc
export const editPatient = async (req: any, res: any) => {
    try {
      const id = req.params.id;
      const {
        dob, phone, firstname, lastname, gender, disease, laterality,
        referback, timing, referedto, address, note, uuid
      } = req.body;
    //   console.log("PATIENT DATA:", req.body);
  
      const patient = await Patient.findOne({
        where: { uuid: id },
        include: [{ model: User }, { model: Address }, { model: Appointment }]
      });
  
      if (patient) {
        patient.dob = dob;
        patient.phone = phone;
        patient.firstname = firstname;
        patient.lastname = lastname;
        patient.gender = gender;
        patient.disease = disease;
        patient.laterality = laterality;
        patient.referback = referback;
        patient.timing = timing;
        patient.referedto = referedto;
        patient.address = address;
        patient.note = note;
  
        await patient.save();
        res.status(200).json({ message: "Patient updated successfully" });
      } else {
        res.status(404).json({ message: "Patient not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error", err });
    }
  };

//tbc
export const chatRooms = async(req: any, res: any) => {
    //show patient as room where doc in referedto or referedby
    try {
        const { uuid } = req.user;
        //check patient appointment is pending or not
        const patientsList = await Patient.findAll({where:{[Op.or]:[{referedby:uuid},{referedto:uuid}]}});
        console.log(patientsList);
        res.status(200).json({success:true,message: "patients found", patientsList});
    } catch (err) {}
}

//tbc
export const chatData = async (req: any, res: any) => {
    try {
        const {id} = req.params;
        console.log("REQUESTTTTT", req.params)
        console.log("dsdfsdfsdfsdf",id)
        const chatList = await Message.findAll({where:{room:id}});
        console.log("chatList",chatList)

        if (!chatList) {
            return res.status(404).json({ message: "No chats found for this room" });
        }
        res.status(200).json({ chats: chatList, message: "Chats found" });
    } catch (err) {
        // console.error("Error fetching chat data:", err);
        res.status(500).json({ message: "An error occurred while fetching chat data" });
    }
};

export const addStaff = async (req: any, res: Response) => {
    try {
        // console.log("BODY:::::::::", req.body)
        const {uuid} = req.user;
      const { name, email, phone, gender } = req.body;
  
      const newStaff = await Staff.create({
        name,
        email,
        phone,
        gender,
        user: uuid
      });
      res.status(201).json({
        message: 'Staff added successfully',
        staff: newStaff,
      });
    } catch (err) {
      res.status(500).json({ message: 'Failed to add staff', err });
    }
};

export const viewStaff = async (req: any, res: Response) => {
    try {
        // console.log("BODY:::::::::", req.body)
        const {uuid} = req.user;
        const staffList = await Staff.findAll({where: {user: uuid}})
        if(staffList) {
            res.status(200).json({"StaffList": staffList})
        }
    } catch (err) {
    res.status(500).json({ message: 'Failed to add staff', err });
    }
};

export const getStaff = async(req: any, res: any) => {
    try {
        const { id } = req.params;
        // console.log("ID:::::::::::", id)
        const staff = await Staff.findOne({where: {uuid: id}} );
        res.status(200).json({"staffData": staff, "message": "Staff data received"});
    } catch (err) {
        res.status(500).json({message: "Internal server error", err});
    }
}

export const editStaff = async (req: any, res: Response) => {
    try {
        const id = req.params.id;
        // console.log("BODYYYYYYYY:::::::", req.body)
        const { name, email, phone, gender } = req.body;
        const staff = await Staff.findOne({where: {uuid: id}})
        if ( staff ) {
            staff.name = name;
            staff.email = email;
            staff.phone = phone;
            staff.gender = gender
        }
        await staff?.save();
        res.status(200).json({ message: "Staff updated successfully" });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add staff', err });
    }
};

export const deleteStaff = async (req: any, res: any) => {
    try {
        const id = req.params.id;
        await Staff.destroy({where: {uuid: id}});
        res.status(200).json({message: "Staff deleted."});
    } catch (err) {
        res.status(500).json({message: "Internal server error", err})
    }
}

//tbc
export const dashboardData = async(req:any, res:Response) => {
    try {
        const { uuid } = req.user;
        // console.log("ID:::::::::::::::::::::::::::::::::::::::::", uuid)
        const referralCount = await Patient.count({where: {referedto: uuid}});
        const referralTime = await Patient.findOne({where: {referedto: uuid}});
        const referralCompletedCount = await Appointment.count({ where: [{user: uuid}, { status: "completed" }]});
        const docCount = await User.count({where: {docType: 2}});
        // console.log("DATA:::::::", referralCount, " ", referralCompletedCount, " ", docCount)
        res.status(200).json({referralCount, referralCompletedCount, docCount});
    } catch (err) {
        res.status(500).json({"message":`${err}`});
    }
} 

export const downloadPatientPDF = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findOne({ where: { uuid: id } });
        
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const patientData = patient.toJSON();
        const doc = new PDFDocument();
        res.header('Content-Type', 'application/pdf');
        res.attachment('patient_data.pdf');
        doc.pipe(res);

        doc.font('Helvetica-Bold').fontSize(16).text('Patient Information', { align: 'center' });
        doc.moveDown();
        
        doc.font('Helvetica-Bold').fontSize(14).text('Basic Information', { align: 'left' });
        doc.font('Helvetica').fontSize(11)
        doc.text(`Name: ${patientData.firstname} ${patientData.lastname}`);
        doc.text(`Phone: ${patientData.phone}`);
        doc.text(`Email: ${patientData.email}`);
        doc.text(`Gender: ${patientData.gender}`, { paragraphGap: 20 });

        doc.font('Helvetica-Bold').fontSize(14).text('Reason of Consult', { align: 'left' });
        doc.font('Helvetica').fontSize(11)
        doc.text(`Reason: ${patientData.reason || 'Not provided'}`);
        doc.text(`Laterality: ${patientData.laterality || 'Not provided'}`);
        doc.text(`Timing: ${patientData.timing || 'Not provided'}`, { paragraphGap: 20 });

        doc.font('Helvetica-Bold').fontSize(14).text('Referral MD', { align: 'left' });
        doc.font('Helvetica').fontSize(11)
        doc.text(`Referral MD: ${patientData.referralMD || 'Not provided'}`);
        doc.text(`Location: ${patientData.location || 'Not provided'}`);
        doc.text(`Notes: ${patientData.notes || 'Not provided'}`, { paragraphGap: 20 });

        doc.font('Helvetica-Bold').fontSize(14).text('Appointment Details', { align: 'left' });
        doc.font('Helvetica').fontSize(11)
        doc.text(`Appointment date/time: ${patientData.referralMD || 'Not provided'}`);
        doc.text(`Surgical: ${patientData.location || 'Not provided'}`, { paragraphGap: 20 });

        doc.font('Helvetica-Bold').fontSize(14).text('Notes', { align: 'left' });
        doc.font('Helvetica').fontSize(11)
        doc.text(`Notes: ${patientData.notes || 'Not provided'}`, { paragraphGap: 20 });

        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error generating PDF' });
    }
};

export const getDoc = async (req: any, res: any) => {
    try {
        const {uuid} = req.user;
        const doctor = await User.findByPk(uuid);
        console.log("ENFNFEPQNGWEQB", doctor)
        res.status(200).json({"doctor": doctor, "message": "Doc Found"});

    } catch(err){
        res.status(500).json({"message":`Error--->${err}`})
    }
}
