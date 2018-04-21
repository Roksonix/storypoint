const express = require('express');
const path = reuqire('path');
const app = express();

app.listen(process.env.PORT || 8080);
app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/index.html'));
});