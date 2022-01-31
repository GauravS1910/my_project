const express = require('express'); 

const router = express.Router(); 
    
router.get('/', (req, res)=>{
    res.render('index'); 
})

router.get('/register', (req, res)=>{
    res.render('register'); 
})

router.get('/login', (req, res) => {
    res.render('login'); 
})

router.get('/inventory', (req, res) => {
    res.render('inventory');
})

router.get('/addItem', (req, res) => {
    res.render('addItem');
})
module.exports = router; 