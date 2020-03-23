const express = require('express');
const router = express.Router();
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Form Validation', success: req.session.success, error: req.session.errors});
    req.session.errors = null;
});
router.post('/submit', function(req, res, next) {
    req.check("email", 'Invalid email').isEmail();
    req.check('name','name is empty').isLength({min: 1}).equals(req.body.confirmName);
    const errors = req.validationErrors();
    if(error){
        req.session.errors = errors;
        req.session.success = false;
    }else{
        req.session.success = true;
    }
        res.redirect('/')
    
})
module.exports = router;