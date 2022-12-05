const { Router } = require("express");

const router = Router();

const checkToken = require("../middleware/checktoken.js");

const tagsController = require("../controllers/tags-controller.js");

router.post("/", checkToken, tagsController.createTag);
router.get("/", checkToken, tagsController.getAllTags);
router.get("/:name/videos", checkToken, tagsController.getAllTagsFromVideo);
router.put("/:id", checkToken, tagsController.updateTag);
router.delete("/:id", checkToken, tagsController.deleteTag);

module.exports = router;
