const db = require("../models");
const Upload = db.fileUpload;
const Op = db.Sequelize.Op;
allTypeUploader = require('../config/helper.imageUploader');
singlePic = allTypeUploader.single('image');
multi_upload = allTypeUploader.array('images');
Fs = require('fs')
const path = require('path')
PDFDocument = require('pdfkit')
exports.create = async (req, res) => {
  singlePic(req, res, err => {

    if (err) {
      return res.send({
        message: err.message
      })
    }
    const data = Fs.readFileSync(`/home/neuro/node-postgresql/client/assets/.docs/${req.file.filename}`, 'utf8');
    console.log(data)
    var originalname = path.parse(req.file.filename).name;
    // Create a document
    const doc = new PDFDocument();

    // Saving the pdf file in root directory.
    doc.pipe(fs.createWriteStream(`client/assets/.docs/${originalname}.pdf`));

    doc
      .addPage()
      .fontSize(15)
      .text(data, 100, 100);
    let uploadedField = {
      fileType: "image",
      image: req.file.filename
    }

    Upload.create(uploadedField)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  })
}
//for multiple upload.
exports.updateMultiple= (req, res) => {
  multi_upload(req, res, function (err) {
      if (err) {
          // A Multer error occurred when uploading.
          res.status(500).send({ error: { message: `Multer uploading error: ${err.message}` } }).end();
          return;
      } else if (err) {
          // An unknown error occurred when uploading.
          if (err.name == 'ExtensionError') {
              res.status(413).send({ error: { message: err.message } }).end();
          } else {
              res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
          }
          return;
      }

      // Everything went fine.
      // show file `req.files`
      // show body `req.body`
      Upload.create({files: req.files})
      .then(data => {
        res.status(200).json("file uploaded in the expected path");
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      })  })
}