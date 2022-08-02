const { response } = require('express');
var express = require('express');
var router = express.Router();

var messagebird = require('messagebird')('9IdlVu6vRuMIPN5i0jvR9RcVe');
router.get('/',function(req,res,next){
  res.render('index')
})
router.post('/step2',(req,res)=>{
  var number = req.body.number
  messagebird.verify.create(number,{
    template:"your verification code is %token"
  },function(err,response){
    if(err){
      console.log(err)
      res.render("index",{
        error: err.errors[0]
      })
    }
    else{
      console.log(response)
      res.render("otp",{
        id:response.id
      })
      }
    
  })
})

router.post("/step3",(req,res)=>{
  var id = req.body.id
  var token = req.body.open
  messagebird.verify.verify(id,token,(err,response)=>{
    if(err){
      res.send(err)
    }
    else{
      res.render("success")
    }
  })
})

module.exports = router