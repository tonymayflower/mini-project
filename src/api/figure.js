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

    return Figure
      .listFromOrder({orderUuid})
      .then(res.send.bind(res))
    });

router.post('/insert', (req, res) => {
    let {profile, status = "TODO", orderUuid} = req.body
   return  Figure.create({
    profile,
    status,
    orderUuid
   })
   .then( async (res) => {
     console.log(res)
      await publishToQueue("figureCreated",JSON.stringify(res))
      return res;
   })
   .then(res.send.bind(res))
   .catch((err)=>{
    return res.status(500).send({ error: 'Something failed!' });
   }) 
})

router.post('/update', (req, res) => {
  const {figureUuid, status} = req.body
  
  return Figure.updateStatus({
  figureUuid,
  status
 })
 .then(res.send.bind(res))
 .catch((err)=>{
  return res.status(500).send({ error: 'Something failed!' });
 }) 
})

module.exports = router;