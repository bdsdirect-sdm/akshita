import multer from 'multer';
import path from 'path';
import fs from 'fs';

const baseUploadDir = 'uploads/';

const ensureFolderExists = (folderPath: string) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
};

ensureFolderExists(`${baseUploadDir}profile`);
ensureFolderExists(`${baseUploadDir}waves/photos`);
ensureFolderExists(`${baseUploadDir}waves/videos`);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = '';

        if (file.fieldname === 'profilePhoto') {
            folder = 'profile';
        } else if (file.mimetype.startsWith('image')) {
            folder = 'waves/photos';
        } else if (file.mimetype.startsWith('video')) {
            folder = 'waves/videos';
        } 

        ensureFolderExists(`${baseUploadDir}${folder}`);
        cb(null, `${baseUploadDir}${folder}`);
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

export const uploader = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|png|jpg|mp4|avi|mov/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        if (file.fieldname === 'profilePhoto') {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                return cb(null, true);
            } else {
                return cb(new Error('Error: Only JPEG and PNG files are allowed for profile photo.'));
            }
        }
        if (file.fieldname === 'photos') {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                return cb(null, true);
            } else {
                return cb(new Error('Error: Only JPEG and PNG files are allowed for profile photo.'));
            }
        }

        if (file.fieldname === 'videos') {
            if (file.mimetype === 'video/mp4' || file.mimetype === 'video/avi' || file.mimetype === 'video/mov') {
                return cb(null, true);
            } else {
                return cb(new Error('Error: Only JPEG and PNG files are allowed for profile photo.'));
            }
        }

        cb(new Error('Error: File type not allowed!'));
    }
});
