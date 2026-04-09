const arenaController=require("../controllers/ArenaController")
const router=require("express").Router()
const upload=require("../middleware/UploadMiddleware")
const authMiddleware = require("../middleware/AuthMiddleware");


 

router.post("/addarena",upload.array("images",20),arenaController.newArena);
router.get("/allarena",arenaController.getAllArena);
router.get("/:id", arenaController.getArenaById);
router.delete("/deletearena/:id",arenaController.deleteArena);
router.put("/updatearena/:id",upload.array("images",20),arenaController.updateArena);

module.exports=router