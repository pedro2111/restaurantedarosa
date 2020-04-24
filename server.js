const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());

app.use(function (req,res,next) {

    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

});

app.use(express.static(__dirname + '/dist/cozinha-da-rosa'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/cozinha-da-rosa/index.html'));});
app.listen(process.env.PORT || 8080);
