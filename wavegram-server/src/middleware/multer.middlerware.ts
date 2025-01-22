import multer from "multer";
import fs from "node:fs";
import path from "node:path";
import {v4 as uuidv4} from "uuid"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "uploads"
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
            
        }
        cb(null, dir);
    },
    
})


export const uploadWave = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|png|jpg|mp4|avi|mov/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
        return cb(null, true);
        }
        cb(new Error('Error: File type not allowed!'));
    }
});
  