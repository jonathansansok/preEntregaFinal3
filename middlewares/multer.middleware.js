const multer = require("multer");
const path = require("path");

const store = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../", "assets", "images"));
    },
    filename: function (req, file, cb) {
      cb(null, `image-${Date.now()}.${file.mimetype.split("/")[1]}`);
    },
  });
  
  const upload = multer({ storage: store });
  
  module.exports = upload;