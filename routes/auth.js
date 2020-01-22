const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');
const jwt = require("jsonwebtoken");
const {jwtOptions} = require('../config/jwtOptions');


//function to add a user
const createUser = async ({ firstName , lastName, email , password }) => {
    return await User.create({ firstName , lastName,  email , password });
};

// find user
const getUser = async obj => {
    return await User.findOne({
        where: obj,
    });
};


// login
router.post('/login', async function(req, res, next) {
    
    const { email, password } = req.body;
    
    if (email && password) {
        let user = await getUser({ email: email });
        if (!user) {
          return  res.status(401).json({ message: 'No such user found' });
        }

        bcrypt.compare( password , user.password, (err, result) =>{
            if(err){
                 res.status(403).json({message :'incorrect password'});
            }
            if(result){
                let payload = { user   };
                console.log(jwtOptions.secretOrKey);
                let token = jwt.sign(payload, jwtOptions.secretOrKey);
               return res.status(200).json({ message: 'ok', token });
            }
            else{
              return  res.status(403).json({message :'incorrect password'});
            }

        })

    }
});

//register a new user
router.post('/register', async  function(req, res, next) {

    const user = await getUser({email : req.body.email});

    if(user)
    return   res.status(409).json({message : 'email already exists'});

    bcrypt.hash(req.body.password , null , null, (err, hash) => {

   
        createUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email : req.body.email ,
            password : hash ,
        }).then(user =>
            res.status(200).json({ user, msg: 'account created successfully' }) );
    })

});


module.exports = router;
