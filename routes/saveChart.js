var express = require('express');
var fs = require('fs');
var router = express.Router();

router.post('/', function(req, res) {
    let state = req.body;
    let chartName = state.name;
    let filePath = __dirname + `/../data/charts/chart-${chartName}.json`;
    fs.writeFile(filePath, JSON.stringify(state), function(err) {
        if (err == null) {
            filePath = __dirname + `/../data/charts/${chartName}.json`;
            fs.writeFile(filePath, JSON.stringify(state), function(err) {
                if (err == null) {
                    res.send('Successfully saved chart');
                } else {
                    res.send('Error occurred while saving chart');
                }
            }); 
        } else {
            res.send('Error occurred while saving chart');
        }
    });
});

router.get('/', function(req, res) {
    res.send('saveChart');
});

module.exports = router;
