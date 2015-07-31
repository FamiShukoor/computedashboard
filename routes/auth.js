var jwt = require('jwt-simple');
var bcrypt = require('bcryptjs');
var usermodal = require('../modal/user');//dummy db data

var hash = bcrypt.hashSync(usermodal.password);// hash needs to be updated in db while creating user
var auth = {
    login: function(req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';
        if (username == '' || password == '') {
            res.status(401);
            res.json({
            "status": 401,
            "message": 'Please enter credentials'
            });
            return;
        }
        // Fire a query to your DB and check if the credentials are valid
        var dbUserObj = auth.validate(username, password);
        if (!dbUserObj) { // If authentication fails, we send a 401 back
            res.status(401);
            res.json({
            "status": 401,
            "message": "Invalid credentials"
        });
        return;
        }
        if (dbUserObj) {
            // If authentication is success, we will generate a token
            // and dispatch it to the client
            res.json(genToken(dbUserObj));
        }
    },
    validate: function(username, password) {
        var passStat = bcrypt.compareSync(password, hash); 
        if(usermodal.username == username && passStat){
            return usermodal;
        }else{
             return null;
        }
    },
    validateUser: function(username) {
       return usermodal;
    },
}
// private method
function genToken(user) {
    var expires = expiresIn(7); // 7 days
    var token = jwt.encode({
        exp: expires
    }, require('../config/secret')());
    return {
        token: token,
        expires: expires,
        user: user
    };
}
function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;