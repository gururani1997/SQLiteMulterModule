module.exports = app => {
    const upload = require("../controllers/upload.controller.js");
    var router = require("express").Router();
    
    router.post("/", upload.create);
    
    router.post("/multiple", upload.updateMultiple);
    
    app.use('/api/uploads', router);
  };