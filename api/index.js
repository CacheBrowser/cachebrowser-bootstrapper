var _ = require('lodash');
var express = require('express');
var router = express.Router();

var host = require('./host');
var cdn = require('./cdn');


router.post('/hosts', host.addHost);
router.get('/hosts', host.searchHosts);
router.get('/hosts/:hostname', host.getHost);

router.post('/cdns', cdn.addCDN);
router.get('/cdns', cdn.searchCDN);
router.get('/cdns/:cdnId', cdn.getCDN);

router.use(function(err, req, res, next) {
    console.log(err)
    if (!Array.isArray(err)) {
        err = [err];
    }

    res.status(err[0].status || 500);

    res.json({
        errors: err
    })
});

module.exports = router;
