var express = require('express');
var router = express.Router()

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

function getJson(filePath) {
    return readFile('./data/' + filePath);
}

router.get('/', function (req, res) {
    getJson('landing.json').then( data => {
        res.send(JSON.parse(data));
    })
})

module.exports = router;