const {Router} = require('express');

const router = new Router();
const {Order} = require('../model')
const {publishToQueue} = require('../producer/index')

router.get('/list', async (req, res) => {
  await publishToQueue("myconsumqueue","mypayload");

    return Order
    .list()
    .then(res.send.bind(res))
  });
  
router.post('/insert', (req, res) => {
    const {numberOfFigures, price, userUuid} = req.body
    
   return  res.send(Order.create({
    numberOfFigures,
    price,
    userUuid
   }))      
})

router.post('/update', (req, res) => {
  const {orderUuid, status} = req.body
  
 return  res.send(Figure.updateStatus({
  orderUuid,
  status
 }))      
})

module.exports = router;