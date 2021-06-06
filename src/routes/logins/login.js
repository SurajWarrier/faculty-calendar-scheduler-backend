const express = require('express');
const router = express.Router();
const serverRouter = require('./../../server');

router.post('/login1', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username,password);
    serverRouter.connection.query(`select * from faculty_login where username like '${username}' and password like '${password}'`, function (err, result) {
        result = JSON.parse(JSON.stringify(result));
        let fno = result[0].fno;
        console.log(fno);
        console.log(result);
        if (err) {
            return res.end('Error Occurred while login!');
        }
        if (result.length === 0)
            //return res.redirect('http://localhost:3000/alert1.html');
            return res.end('Incorrect Username/Password')
        else {
            serverRouter.connection.query(`select * from faculty_calendars where fno like '${fno}'`, function(err, result) {
                result = JSON.parse(JSON.stringify(result));
                if (err) {
                    return res.end(err);
                }
                if (result.length === 0) {
                    serverRouter.connection.query(`insert into faculty_calendars values(${fno}, ${fno})` , function (err, result) {
                        console.log(result);
                        if (err) {
                            return res.end('Error Occurred while inserting calendar record!');
                        }
                        else{
                            return res.end('Successfully entered calendar id');
                        }
                    });
                }
                else {
                    console.log("Calendar id is already present in the database");
                    res.redirect('http://localhost:3000/f_home.html');
                    //return res.status(200).json("username and password is correct");
                }
            });

        }

    });
});

router.post('/login2', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username,password);
    serverRouter.connection.query(`select * from admin_login where username like '${username}' and password like '${password}'`, function (err, result) {
        console.log(result);
        if (err) {
            return res.end('Error Occurred while logins in!');
        }
        if (result.length === 0)
            return res.end('Incorrect Username/Password')
            //return res.redirect('http://localhost:3000/alert.html');
        else
            res.redirect('http://localhost:3000/a_home.html');
    });
});

module.exports = router;