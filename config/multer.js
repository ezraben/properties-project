const path = require("path");
const multer = require("multer");

const multerConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    console.log("file from multer config", file);
    const objFile = path.parse(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${objFile.name}_${uniqueSuffix}${objFile.ext}`);
  },
});

// const upload = multer({ storage: storage });

// router.post("/properties", upload.single("propertyImg"), async (req, res) => {
//   try {
//     const validateValue = await propertiesValidation.validatePropertySchema(
//       req.body
//     );
//     if (validateValue) {
//       const newUserData = await propertiesModel.insertProperty(
//         // validateValue.img,
//         validateValue.price,
//         validateValue.description,
//         validateValue.address
//       );
//       res.json("property created successfully");
//     }
//     console.log(req.body);
//   } catch (err) {
//     res.json(err);
//   }
// });

module.exports = multer({ storage: multerConfig });
