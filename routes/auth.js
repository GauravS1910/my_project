const express = require('express'); 
const authController = require('../controllers/auth.js'); 

const router = express.Router(); 

router.post('/register', authController.register); 
router.post('/login', authController.login); 
router.post('/inventory', (req, res) =>{
    console.log(req.body.item_id, req.body.presence);
})

module.exports = router; 
