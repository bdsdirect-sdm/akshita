import multer from "multer";
import fs from "fs"

const storage = multer.diskStorage({
    destination: (_req, file, cb) => {
        const dir = "upload";
        if(!fs.existsSync(dir))
        {
            fs.mkdirSync(dir)
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {

        const name = Date.now() + file.originalname;
        // console.log("name:::::::::::",name)
        cb(null, name);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if( file.fieldname == "image" || file.fieldname == "logo" ){
            if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
                cb(null, true);
            }
            else {
                cb(null, false);
                new Error("Enter image file");
            }
        }
    }
})


export default upload;