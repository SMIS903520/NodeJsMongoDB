var express = require('express');
var router = express.Router();
const data = require('../userData');
const methods = require('../methods');



const registerRoute = "../views/pages/register";
const loginRoute = "../views/pages/login";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Banco Infinity' });
});

router.get ('/home', function(req, res, next){
  res.render ('home',{title1: "Bienvenido"});
})
router.get('/register', (req, res) => {
  res.render(registerRoute);
});

router.get('/login', (req, res) => {
  res.render(loginRoute);
});

router.post('/register', (req, res) => {
  const {fullnname, email, Password, confirmP } = req.body;
  
  if (Password === confirmP){
    if (data.data.find(dat => dat.email === email)) {
      res.render(registerRoute,{
        message: "El usuario ya esta registrado",
        messageClass: "alert-danger"
      });

    }

    const hashedPassword = methods.getHashedPassWord(Password);

    data.data.push({
      fullnname,
      email,
      Password: hashedPassword
    });
  
    res.render(loginRegister,{
      message: "El registro se ha completado",
      messageClass: "alert-success"
    });

  }else{
    res.render(registerRoute,{
      message: "El password no coincide",
      messageClass: "alert-danger"
    });
    
  }

});

router.post ('/login', (req, res) => {
  const {email, Password } = req.body;
  const hashedPassword = methods.getHashedPassWord(Password);

  const dataUser = data.data.find(u => {
    return u.email === email && hashedPassword === u.password;
  });

  if (dataUser){
    const authToken = methods.generateAuthToken();

    methods.authTokens[authToken] = dataUser;
    res.cookie('AuthToken', authToken);
    res.redirect("/home");

  }else{
    res.render(loginRoute, {
      message: "Usuario y password invalidos",
      messageClass: "alert-danger"
    });
  }
});

module.exports = router;
