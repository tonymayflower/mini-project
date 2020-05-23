const {Router} = require('express');
const router = new Router();
const {Order} = require('../model')
const {publishToQueue} = require('../producer/index')


router.get('/list', (req, res) => {
    return Order
    .list()
    .then(res.send.bind(res))
    .catch((err)=>{
      return res.status(500).send({ error: 'Something failed!' });
     }) 
  });
  
router.post('/insert', (req, res) => {
  const {numberOfFigures, price, userUuid} = req.body
  
   return  Order.create({
    numberOfFigures,
    price,
    userUuid
   })
   .then(res.send.bind(res)) 
   .catch((err)=>{
    return res.status(500).send({ error: 'Something failed!' });
   }) 
})

router.post('/update', (req, res) => {
  const {orderUuid, status} = req.body
  
 return Figure.updateStatus({
  orderUuid,
  status
 })
 .then(res.send.bind(res))
 .catch((err)=>{
  return res.status(500).send({ error: 'Something failed!' });
 }) 
})

module.exports = router;