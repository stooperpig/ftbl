var express = require('express');

var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res) {
    let chartName = req.query.chartName;
    console.log('chartName: ' + chartName);

    if (chartName === undefined) {
        res.status(500);
        res.send('chartName is mandatory parameter');
    } else {       
        let filePath = __dirname + `/../data/charts/${chartName}.json`;

        try {
            let rawData = fs.readFileSync(filePath);
            res.setHeader('Content-Type', 'application/json');
            res.send(rawData);
        } catch (err) {
            res.status(400);
            res.send('chart not found');
        }
    }
});

module.exports = router;