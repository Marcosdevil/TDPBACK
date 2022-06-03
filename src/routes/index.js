const bcryptjs = require('bcryptjs');
const { Router } = require('express');
const router = Router();
const salt = require('../utils/utils_salt');
const User = require('../models/user');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello World'))

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({email: email, password: password});

    //Encriptar la contraseña
    //const salt = bcryptjs.genSaltSync();

    //newUser.password = bcryptjs.hashSync(password, salt);
    newUser.password = salt.encrypt(password);
    
    //Guarda en BD
    await newUser.save();

    //vamos a crear el token
    const token = jwt.sign({ _id: newUser._id }, 'secretKey')
    res.status(200).json({ token: token});
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    

    if(!user || !bcryptjs.compareSync(password, user.password)) {
        return res.status(401).send("El correo o la contraseña no son válidas.");
    }
    


    const token = jwt.sign({_id: user._id}, 'secretKey');
    return res.status(200).json({token}); 

})

router.get('/admin', verifyToken, (req, res) => {
    res.json([
        {
            test: "kolb",
            pregunta: 1,
            inciso_a: 1,
            inciso_b: 2,
            inciso_c: 4,
            inciso_d: 3
        },
        {
            test: "kolb",
            pregunta: 2,
            inciso_a: 3,
            inciso_b: 2,
            inciso_c: 1,
            inciso_d: 4
        },

    ])
})

module.exports = router;

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send("Petición no autorizada.");
    }
    const token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
        return es.status(401).send("Petición no autorizada.");
    }
    const payload = jwt.verify(token, 'secretKey')
    req.userId = payload._id;
    next();
}