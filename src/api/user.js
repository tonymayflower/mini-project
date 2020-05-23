const {Router} = require('express');

const router = new Router();
const {User} = require('../model')
const {publishToQueue} = require('../producer/index')

router.get('/list', async (req, res) => {
  await publishToQueue("myconsumqueue","mypayload");

    return User
    .list()
    .then(res.send.bind(res))
  });
  
router.post('/insert', (req, res) => {
    const {email, password} = req.body
    
   return  res.send(User.create({
    email,
    password
   }))      
})

module.exports = router;