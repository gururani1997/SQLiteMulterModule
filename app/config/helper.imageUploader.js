const path = require('path')
const multer = require('multer')
fs = require('fs-extra');
const storage = multer.diskStorage({
    // destination:(req,res,cb)=>{
    //     cb(null,'client/assets/images')
    // },
    destination: (req, file, cb) => {
        let way = path.extname(file.originalname).toLowerCase();
        if (way == ".jpg" || way == ".jpeg" ||
            way == ".png" || way == ".giff") way = ".images";

        if (way == ".doc" || way == ".docx" ||
            way == ".html" || way == ".htm" ||
            way == ".odt" || way == ".pdf" ||
            way == ".xls" || way == ".xlsx" ||
            way == ".xls" || way == ".xlsx" ||
            way == ".txt" || way == ".pptx") way = ".docs";

        const dest = `client/assets/${way}`
        fs.access(dest, function (error) {
            if (error) {
                console.log("Directory does not exist.");
                return fs.mkdir(dest, (error) => cb(error, dest));
            } else {
                console.log("Directory exists.");
                return cb(null, dest);
            }

        });
    },
    filename: (req, file, cb) => {
        var datetimestamp = Date.now();
        var fileorignalname = file.originalname;
        fileorignalname = fileorignalname.replace(/[^a-zA-Z0-9.]/g, '').toLowerCase();
        cb(null, datetimestamp + '_' + fileorignalname)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: async (req, file, cb) => {
        if (path.extname(file.originalname) == '.txt') {
            // file.mimetype = 'application/pdf'
            // file.originalname=path.parse(file.originalname).name;
            // file.originalname=file.originalname+'.pdf'
        }
        return cb(null, true);
        // return cb({status:405,message:"only image allowed"},false)
    }
})
// async function conversion(file){
//     const doc = await PDFNet.PDFDoc.create();

//     // perform the conversion with no optional parameters
//   let data=  await PDFNet.Convert.toPdf(doc, file);
//   return data;
// }
const multi_upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        // if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        // } else {
        //     cb(null, false);
        //     const err = new Error('Only .png, .jpg and .jpeg format allowed!')
        //     err.name = 'ExtensionError'
        //     return cb(err);
        // }
    },
}).array('uploadedImages', 2)

module.exports = upload,multi_upload;