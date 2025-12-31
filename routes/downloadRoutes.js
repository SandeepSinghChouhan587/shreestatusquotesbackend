const express =require("express" ); 
const  downloadWithWatermark  =require( "../controllers/downloadController.js") ;

const router = express.Router();

router.post("/download", downloadWithWatermark);

module.exports =  router;
