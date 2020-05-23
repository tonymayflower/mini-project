const {Router} = require('express');

const router = new Router();
const {Figure} = require('../model')
const {publishToQueue} = require('../producer/index')

router.get('/list', async (req, res) => {
    return Figure
    .list()
    .then(res.send.bind(res))
  });
  router.get('/listFromOrder', async (req, res) => {
    const {orderUuid} = req.query
  console.log('orderUuid : ', orderUuid)
      return Figure
      .listFromOrder({orderUuid})
      .then(res.send.bind(res))
    });
router.post('/insert', (req, res) => {
    const {profile, status, orderUuid} = req.body
    
   return  res.send(Figure.create({
    profile,
    status,
    orderUuid
   }))      
})

router.post('/update', (req, res) => {
  const {figureUuid, status} = req.body
  
 return  res.send(Figure.updateStatus({
  figureUuid,
  status
 }))      
})

module.exports = router;