const express = require('express');
const app = express();

app.listen(process.env.PORT || 8080);
app.get('/', function(req, res) {
    res.sendFile('/index.html');
});