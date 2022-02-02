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

    db.query('SELECT * FROM seller WHERE email = ?', [email], async (error, results) => {
        if(error) {
            console.log(error); 
        } 
        if(results.length==0) {
            return res.render('login', {
                message: 'No Profile Found!!'
            }); 
        }
        console.log('jsjsk');
       // console.log(results[0].password)
        const verified = bcrypt.compareSync(password, results[0].hashkey); 
        console.log('nextttt')
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
    // var items = [
    //     {
    //         id: '123',
    //         item_name: 'djd',
    //         cost: '267',
    //         present: true,
    //         desc: {
    //             jj: 'shh',
    //             tdh: 'jdhd',
    //             jfd: 'iff'
    //         }
    //     },
    //     {
    //         id: '113',
    //         item_name: 'deejd',
    //         cost: '26r7',
    //         present: false,
    //         desc: {
    //             jj: 'sheth',
    //             tdh: 'jdhgdd',
    //             jfd: 'ifdhff',
    //             fk: 'efbj'
    //         }
    //     }
    // ];
    // res.render('inventory', {items: items});
}

exports.register = (req, res) => {
     console.log(req.body); 

    const { name, email, password, passwordConfirm, gstIN, pan_num, add_line1, add_line2, contact, city, state, country, pincode} = req.body; 

    db.query('SELECT email FROM seller WHERE email = ?', [email], async (error, results) => {
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

        db.query('INSERT INTO seller   SET ?', {shop_name:name, email:email, hashkey:hashPassword, address_line1: add_line1, address_line2: add_line2, city: city, state: state, contact: contact, country: country, pincode: Number(pincode), gst_number: gstIN, pan_number: pan_num}, (error, results) => {
            if(error){
                console.log(error); 
            } else {
                db.query('SELECT userID FROM seller WHERE email = ?', [email], async (error, results) => {
                    if(error){
                        console.log(error); 
                    } else {
                        return res.render('register', {
                            message: `User Registered with userID: ${results[0].userID}` 
                        })
                    }
                }); 
            }
        });  
        db.query('SELECT userID FROM seller WHERE email = ?', [email], async (error, results) => {
            if(error){
                console.log(error); 
            } else {
                return res.render('register', {
                    message: `User Registered with userID: ${results[0].userID}` 
                })
            }
        }); 
    }); 

}
