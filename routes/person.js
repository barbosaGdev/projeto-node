const router = require('express').Router()
const controller = require('../controllers/person')

router.get('/person', controller.list)
router.get('/person/:id', controller.show)
router.post('/person', controller.create)
router.put('/person/:id', controller.update)
router.delete('/person/:id', controller.delete)

module.exports = router