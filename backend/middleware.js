const jwt = require('jsonwebtoken');
const SECRET_KEY='empAuthentication'
const decodeTokenMiddleware = (req, res, next) => {

    if (!(req.headers['authorization'].split(' ')[1])) {
      return res.status(401).json({ message: 'Token is required' });
    }
    try{
      const decoded=  jwt.verify(req.headers['authorization'].split(' ')[1], SECRET_KEY) 
          return next();       
    }
    catch(err){
        return res.status(401).json({ message: "Token is not valid or it's expired." });
    } 
  };


// Add this middleware before defining your routes
function requireLogin(req, res, next) {
  if (req.session && req.session.user) {
    // User is logged in, proceed to the next middleware or route handler
    return next();
  } else {
    // User is not logged in, redirect to the login page
    res.redirect('/login');
  }
}


  module.exports=decodeTokenMiddleware