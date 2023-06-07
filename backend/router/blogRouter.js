const router = require("express").Router();
const {
    read,
    add,
    update,
    deleteblog,
    like,
    watch,
} = require("../controller/blogController");
router.post("/add/", add);
router.get("/read/", read);
router.put("/edit/", update);
router.delete("/delete/:id", deleteblog);
router.get("/like/:id", like);
router.put("/watch/:id", watch);

module.exports = router;