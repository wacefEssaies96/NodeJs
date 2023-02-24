const express = require('express')
const router = express.Router()
const service = require('../services/studentservice')


router.post("/create", service.create)

router.get("/find-by-name/:name", service.findByName)

router.get("/", service.findAll)

router.get("/find-sorted", service.findSorted)

router.put("/advanced-update", service.advancedUpdate)

router.delete("/delete", service.delete)

module.exports = router;
