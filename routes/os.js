var express = require('express');
var router = express.Router();
var os = require("os")

router.get('/', function (req, res, next) {
    res.send({
        hostname: os.hostname(),
        type: os.type(),
        platform: os.platform()
    });
});

router.get('/cpus', function (req, res, next) {
    res.send(os.cpus());
});

router.get('/cpus/:id', function (req, res, next) {
    res.send( os.cpus()[req.params.id]);
});


module.exports = router;