const {Router} = require('express');

const router = new Router();
const {User} = require('../model')
const {publishToQueue} = require('../producer/index')

router.get('/list', async (req, res) => {
    return User
    .list()
    .then(res.send.bind(res))
    .catch((err)=>{
      return res.status(500).send({ error: 'Something failed!' });
     }) 
  });
  
router.post('/insert', (req, res) => {
    const {email, password} = req.body
    
   return  User.create({
    email,
    password
   })
   .then(res.send.bind(res)) 
   .catch((err)=>{
    return res.status(500).send({ error: 'Something failed!' });
   }) 
})

module.exports = router;