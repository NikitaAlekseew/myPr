const multer = require("multer");
const path = require("path");

const generateRandomString = (length) => {
  return [...Array(length)]?.map(() => Math.random().toString(36)[2]).join("");
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public/uploads");
    console.log("Сохранение файлов в:", uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + generateRandomString(6);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
