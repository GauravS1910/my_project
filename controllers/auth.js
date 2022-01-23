const mysql = require('mysql');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE, 
}); 

    exports.login = (req, res) => {
    
    console.log(req.body); 

    const { email, password } = req.body; 

    db.query('SELECT * FROM user WHERE email = ?', [email], async (error, results) => {
        if(error) {
            console.log(error); 
        } 
        if(results.length==0) {
            return res.render('login', {
                message: 'No Profile Found!!'
            }); 
        }

        const verified = bcrypt.compareSync(password, results[0].password); 
        
        console.log(verified); 

        if (verified == true) {
            return res.render('login', {
                message: 'Profile Found!!'
            });
        } else {
            return res.render('login', {
                message: 'Wrong Password!!'
            });
        }

    }); 

}

exports.register = (req, res) => {
    console.log(req.body); 

    const { name, email, password, passwordConfirm} = req.body; 

    db.query('SELECT email FROM user WHERE email = ?', [email], async (error, results) => {
        if(error){
            console.log(error); 
        } 
        if(results.length > 0){
            return res.render('register', {
                message: 'That email is already in use'
            })
        } else if(password!=passwordConfirm){
            return res.render('register', {
                message: 'Passwords do not match' 
            });  
        }

        let hashPassword =  bcrypt.hashSync(password, 8); 
        console.log(hashPassword); 

        db.query('INSERT INTO user   SET ?', {name:name, email:email, password:hashPassword}, (error, results) => {
            if(error){
                console.log(error); 
            } else {
                return res.render('register', {
                    message: 'User Registered'
                })
            }
        });  
        
    }); 

}
