const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require('../app/middlewares/authenticate');

const upload = multer({ dest: "./src/public/uploads/" });

const questionController = require("../app/controllers/QuestionController");

router.put("/:id",verifyTokenAndAuthorization, questionController.answer);
router.post("/store", upload.single("image"),verifyTokenAndAuthorization, questionController.store);
router.get("/", questionController.index);

module.exports = router;