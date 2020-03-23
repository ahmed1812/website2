require('dotenv').config();

var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
router.get('/', (req, res) => {
    res.render('contact');
  });
  
  router.post('/', (req, res) => {
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>subject: ${req.body.subject}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
              port: 587,
              // secure: false, // true for 465, false for other ports
              auth: {
                  user: process.env.PASSWORD, // generated ethereal user
                  pass: process.env.EMAIL  // generated ethereal password
              }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
      from: '" my profoleo "<aLgandel86@gmail.com>', // sender address
      to: 'aLgandel86@gmail.com', // list of receivers
     
    
      subject: 'Node Contact Request', // Subject line
      text: req.body.message, // plain text body
      html: output // html body
  };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('contact', {msg:'Email has been sent!!'});
    });
    });


  module.exports = router;