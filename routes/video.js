const { Router } = require("express");

const router = Router();

const checkToken = require("../middleware/checktoken.js");

const videoControllers = require("../controllers/video-controller.js");

router.post("/", checkToken, videoControllers.createVideo);
router.get("/", videoControllers.getVideos);
router.get("/:id", checkToken, videoControllers.getVideosById);
router.put("/:id", checkToken, videoControllers.updateVideo);
router.delete("/:id", checkToken, videoControllers.deleteVideo);

module.exports = router;
